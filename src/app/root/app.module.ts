import { BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

// Import NGRX
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import * as fromRootReducers from './store/reducers'
// import * as fromRootActions from './store/actions'
import * as fromRootEffects from './store/effects'

// NgEngine for NgPacks
import { NgEngineModule,
  ENGINE_CONFIG
} from '../ngEngine'
// Routing Module
import { AppRoutingModule } from './app.routing.module'
// Root Component
import { AppComponent } from './app.component'
// Shared Module
import { SharedModule } from '../shared/shared.module'
// For Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Service Worker
import { ServiceWorkerModule } from '@angular/service-worker'

// App Config for NgEngine
import * as appConfig from '../../appConfig'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'proxy-engine-ng'
    }),
    HttpClientModule,
    BrowserTransferStateModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(fromRootReducers.reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: appConfig.environment.production
    }),
    NgEngineModule,
    appConfig.environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [
    {
      provide: ENGINE_CONFIG,
      useValue: {
        appConfig: appConfig
      }
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
