import { Inject, Injectable, Injector } from '@angular/core'
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular'
import {
  AccountInfo,
  AuthenticationResult,
  BrowserAuthError,
  EventMessage,
  EventType,
  InteractionRequiredAuthError
} from '@azure/msal-browser'
import { Observable, catchError, filter, throwError, timer, map, switchMap, firstValueFrom } from 'rxjs'
import { UserService } from './user.service'
import { NotificationService } from './notification.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly allowedRoles = ['admin', 'user', 'manager']
  private notificationService: NotificationService | undefined

  constructor(
    private readonly msalService: MsalService,
    private readonly msalBroadcastService: MsalBroadcastService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly injector: Injector
  ) {
    this.msalBroadcastService.msalSubject$
      .pipe(filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult
        this.msalService.instance.setActiveAccount(payload.account)
      })

    setTimeout(() => (this.notificationService = injector.get(NotificationService)), 0)
  }

  isActivetedAccount(): boolean {
    return !!this.msalService.instance.getActiveAccount()
  }

  authenticateUser(): Observable<boolean> {
    return this.msalService.handleRedirectObservable().pipe(
      map(() => {
        const account = this.msalService.instance.getActiveAccount()
        const userRoles = account?.idTokenClaims?.roles

        if (!userRoles) {
          return false
        }

        const matchingRoles = userRoles.some((role: string) => this.allowedRoles.includes(role))

        if (matchingRoles) {
          this.userService.account = account

          return true
        } else {
          return false
        }
      })
    )
  }

  async relogin() {
    await this.msalService.instance.handleRedirectPromise()

    await firstValueFrom(
      this.msalService.logoutPopup({
        mainWindowRedirectUri: '/'
      })
    )
  }

  async login() {
    await this.msalService.instance.handleRedirectPromise()

    // Navigating and relying on MsalGuard because loginRedirect loops back to /login despite redirectUri to /home in msal.config.ts
    this.router.navigateByUrl('home', { replaceUrl: true })
  }

  refreshToken(): Observable<
    AuthenticationResult & {
      account: AccountInfo
    }
  > {
    return this.msalService.handleRedirectObservable().pipe(
      switchMap(() =>
        this.msalService.acquireTokenSilent({ scopes: ['user.read'], forceRefresh: true }).pipe(
          catchError((err: Error) => {
            console.error(err)
            if (err instanceof InteractionRequiredAuthError || err instanceof BrowserAuthError) {
              this.notificationService?.show({
                messageKey: 'Reconnecting',
                options: {
                  duration: 1000,
                  direction: 'rtl',
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                }
              })

              timer(1000).subscribe(() => this.msalService.acquireTokenRedirect({ scopes: ['user.read'] }))
            }

            return throwError(() => err)
          })
        )
      )
    )
  }
}
