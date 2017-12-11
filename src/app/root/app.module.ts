import { BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

// NgEngine for NgPacks
import { NgEngineModule } from '../engine/ng-engine.module'
// Routing Module
import { AppRoutingModule } from './app.routing.module'
// Root Component
import { AppComponent } from './app.component'
// Shared Module
import { SharedModule } from '../shared/shared.module'
// NGRX Store
import { AppStoreModule } from '../store/store.module'

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
    AppStoreModule,
    SharedModule,
    NgEngineModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
