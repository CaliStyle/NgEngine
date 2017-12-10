import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

// Environment Config
import { environment } from '../../appConfig'
// Reducers and meta
import { reducers, metaReducers } from './reducers'

// import AppStoreModule in the AppModule after router module
@NgModule({
  imports: [
    RouterModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  exports: [
    StoreModule
  ]
})
export class AppStoreModule { }
