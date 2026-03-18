import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalService,
} from '@azure/msal-angular'

import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser'

import { environment } from '../environments/environment'
import { firstValueFrom } from 'rxjs'

// 🔐 יצירת מופע MSAL
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: `https://login.microsoftonline.com/${environment.msal.tenantId}`,
      redirectUri: `${environment.clientRoot}`,
      postLogoutRedirectUri: `${environment.clientRoot}`,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowPlatformBroker: false,
    },
  })
}

// 🔐 Interceptor (JWT)
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string> | null>()

  // Graph (אם צריך)
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read'])

  // 🔥 ה-API שלך (הכי חשוב!)
  protectedResourceMap.set(`${environment.apiUrl}/*`, [environment.apiScope])

  return {
    interactionType: InteractionType.Popup, // כמו בדוגמה
    protectedResourceMap,
  }
}

// 🔐 Guard
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    loginFailedRoute: '/login',
  }
}

// 🔐 Initializer
export function MSALInitializerFactory(msal: MsalService) {
  return async () => {
    try {
      await firstValueFrom(msal.initialize())

      if (!msal.instance.getActiveAccount()) {
        const accounts = msal.instance.getAllAccounts()
        if (accounts.length) {
          msal.instance.setActiveAccount(accounts[0])
        }
      }
    } catch (error) {
      console.warn(error)
    }
  }
}