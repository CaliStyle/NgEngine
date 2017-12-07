import { BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

// NgEngine for NgPacks
import { NgEngine } from './ng-engine'
// Routing Module
import { AppRoutingModule } from './app.routing.module'
// Root Component
import { AppComponent } from './app.component'
// Shared Module
import { SharedModule } from '../shared/shared.module'
// Pack Module
import { PacksModule } from '../packs/packs.module'
// NGRX Reducers
import { reducers, metaReducers } from './reducers'

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
    // ModuleMapLoaderModule, <- Can not be used on the browser (server only)
    StoreModule.forRoot(reducers, {metaReducers}),
    // Note that you must instrument after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      //  Retains last 25 states
      maxAge: 25,
      // name: 'ngEngine'
    }),
    SharedModule,
    PacksModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule extends NgEngine {
  constructor() {
    super()
    console.log('App Module', this)
  }
}
