import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, Observable, tap } from 'rxjs'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isInProgress = false
  private _isUser: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null)
  private _isAdmin?: boolean
  private _isGlobalAdmin?: boolean

  get isAdmin(): boolean {
    if (this._isAdmin === undefined) {
      this._isAdmin = sessionStorage.getItem('isAdmin') === 'true'
    }
    return this._isAdmin
  }
  private set isAdmin(value: boolean) {
    this._isAdmin = value
    sessionStorage.setItem('isAdmin', String(value))
  }

  get isGlobalAdmin(): boolean {
    if (this._isGlobalAdmin === undefined) {
      this._isGlobalAdmin = sessionStorage.getItem('isGlobalAdmin') === 'true'
    }
    return this._isGlobalAdmin
  }
  private set isGlobalAdmin(value: boolean) {
    this._isGlobalAdmin = value
    sessionStorage.setItem('isGlobalAdmin', String(value))
  }

  constructor(private _http: ApiService) {}

  fetchIsUser(): Observable<boolean> {
    if (this._isUser.value === null && !this.isInProgress) {
      this.isInProgress = true
      this._http
        .validateUser()
        .pipe(
          tap((response) => {
            this._isUser.next(response.isUser)
            this.isAdmin = response.isAdmin
            this.isGlobalAdmin = response.isGlobalAdmin
            this.isInProgress = false
          })
        )
        .subscribe()
    }
    return this._isUser.asObservable().pipe(filter((value): value is boolean => value !== null))
  }
}
