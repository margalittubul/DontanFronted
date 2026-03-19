import {
  BrowserCacheLocation,
  InteractionType,
  PublicClientApplication
} from '@azure/msal-browser'

import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular'

import { environment } from '../environments/environment'

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1

export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: `https://login.microsoftonline.com/${environment.msal.tenantId}`,
      redirectUri: `${environment.clientRoot}/intro`,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    }
  })
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    loginFailedRoute: '/login'
  }
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap: new Map([
      [`${environment.clientRoot}/invitee-ticket/*`, null]
    ])
  }
}