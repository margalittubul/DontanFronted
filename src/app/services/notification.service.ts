import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar'
import { InterpolationParameters, TranslateService } from '@ngx-translate/core'

type instantTranslateArguments =
  | {
      key: string
      interpolateParams?: InterpolationParameters
    }
  | string

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  show(params: {
    messageKey: instantTranslateArguments
    actionKey?: instantTranslateArguments
    options?: MatSnackBarConfig
  }): MatSnackBarRef<any> {
    let message: string
    let action: string

    switch (typeof params.messageKey) {
      case 'object':
        message = this.translate.instant(params.messageKey.key, params.messageKey.interpolateParams)
        break
      case 'string':
        message = this.translate.instant(params.messageKey)
        break
    }

    switch (typeof params.actionKey) {
      case 'object':
        action = this.translate.instant(params.actionKey.key, params.actionKey.interpolateParams)
        break
      case 'string':
        action = this.translate.instant(params.actionKey)
        break
      case 'undefined':
        action = ''
        break
    }

    return this.snackBar.open(message, action, params.options)
  }

  dismiss() {
    this.snackBar.dismiss()
  }
}
