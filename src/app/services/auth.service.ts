import { Injectable } from '@angular/core'
import { MsalBroadcastService, MsalService } from '@azure/msal-angular'
import { AccountInfo, InteractionStatus } from '@azure/msal-browser'
import { Observable, Subject, filter, lastValueFrom, map, take, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _accountSource$ = new Subject<AccountInfo>()
  readonly accountChanges$ = this._accountSource$.asObservable()
  account?: AccountInfo
  activeAccount: string | undefined
  user: string | undefined

  constructor(
    private msalService: MsalService,
    private _msalBroadcastService: MsalBroadcastService
  ) {}

  checkIsMsalInteractionInProgress(): Observable<boolean> {
    return this._msalBroadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      tap(() => {
        const result = this.msalService.instance.getAllAccounts()[0]
        this.msalService.instance.setActiveAccount(result)
        this.setAccount(result)
      }),
      take(1),
      map(() => true)
    )
  }

  getAccount() {
    return this.account
  }

  setAccount(account: AccountInfo) {
    this.account = account
    this._accountSource$.next(account)
    this.activeAccount = account?.name
    this.user = account?.username.split('@')[0]
  }

  async login() {
    await lastValueFrom(this.msalService.loginRedirect())
  }

  async logout() {
    await lastValueFrom(this.msalService.logout())
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() !== null
  }
}
