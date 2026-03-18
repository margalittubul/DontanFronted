import {
  ApplicationConfig,
  provideZoneChangeDetection,
  APP_INITIALIZER,
  LOCALE_ID
} from '@angular/core'

import { provideRouter } from '@angular/router'

import {
  provideHttpClient,
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi
} from '@angular/common/http'

import { routes } from './app.routes'

import {
  MsalInterceptor,
  MsalGuard,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalBroadcastService,
} from '@azure/msal-angular'

import {
  MSALInstanceFactory,
  MSALGuardConfigFactory,
  MSALInterceptorConfigFactory,
  MSALInitializerFactory
} from './msal.config'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 🔥 חשוב כדי שה־Interceptor יעבוד
    provideHttpClient(withInterceptorsFromDi()),

    // 🔐 MSAL INSTANCE
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },

    // 🔐 GUARD CONFIG
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },

    // 🔐 INTERCEPTOR CONFIG
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },

    // 🔐 SERVICES
    MsalService,
    MsalBroadcastService,
    MsalGuard,

    // 🔐 HTTP INTERCEPTOR (JWT)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },

    // 🔐 INIT MSAL
    {
      provide: APP_INITIALIZER,
      useFactory: MSALInitializerFactory,
      deps: [MsalService],
      multi: true,
    },

    // 🌍 לוקל
    {
      provide: LOCALE_ID,
      useValue: 'he-IL',
    }
  ],
}