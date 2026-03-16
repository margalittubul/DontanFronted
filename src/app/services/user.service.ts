import { computed, Injectable, Signal, signal } from '@angular/core'
import { AccountInfo } from '@azure/msal-browser'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _account = signal<AccountInfo | undefined>(undefined)

  set account(account: AccountInfo) {
    this._account.set(account)
  }

  isLoggedIn = computed(() => {
    return Boolean(this._account())
  })

  userID = computed<string | undefined>(() => this._account()?.username.split('@')[0])
  userName = computed<string | undefined>(() => this._account()?.name)
  firstName = computed<string | undefined>(() => this._account()?.name?.split(' ')[0])

  hasHighPermission: Signal<boolean> = computed<boolean>(() => {
    const allowedRoles = ['admin', 'manager']

    return this._account()?.idTokenClaims?.roles?.some((role: string) => allowedRoles.includes(role)) ?? false
  })

  isAdmin: Signal<boolean> = computed<boolean>(
    () => this._account()?.idTokenClaims?.roles?.some((role: string) => role === 'admin') ?? false
  )
}
