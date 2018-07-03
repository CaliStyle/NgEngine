import { NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { RouterModule } from '@angular/router'
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'
import { APP_BASE_HREF } from '@angular/common'
// NgEngine for NgPacks
import { NgEngineModule,
  ENGINE_CONFIG
} from '../ngEngine'
// Root Module
import { AppModule } from './app.module'
// Root Component
import { AppComponent } from './app.component'
// Route Module
import { AppRoutingModule } from './app.routing.module'
// Shared Module
import { SharedModule } from '../shared/shared.module'
// For Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Environment shim from CLI
import * as appConfig from '../../appConfig'

// Import NGRX
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import * as fromRootReducers from './store/reducers'
import * as fromRootEffects from './store/effects'

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    RouterModule,
    AppRoutingModule,
    ModuleMapLoaderModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(fromRootReducers.reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    NgEngineModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: appConfig.environment.APP_BASE_HREF || 'http://localhost:3000'
    },
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
export class AppServerModule {

}
