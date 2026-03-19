import { NgModule, APP_INITIALIZER } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import {
  MsalModule,
  MsalService,
  MsalInterceptor,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG
} from '@azure/msal-angular'

import {
  MSALInstanceFactory,
  MSALGuardConfigFactory,
  MSALInterceptorConfigFactory
} from './msal.config'

export function MSALInitializerFactory(msalService: MsalService) {
  return () => msalService.initialize()
}

@NgModule({
  imports: [MsalModule],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    {
      provide: APP_INITIALIZER,
      useFactory: MSALInitializerFactory,
      deps: [MsalService],
      multi: true
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  exports: [MsalModule]
})
export class MsalCustomModule {}