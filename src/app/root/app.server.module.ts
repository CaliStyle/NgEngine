import { NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'

// NgEngine for NgPacks
import { NgEngine } from '../engine/ng-engine'
// Root Module
import { AppModule } from './app.module'
// Root Component
import { AppComponent } from './app.component'
// Route Module
import { AppRoutingModule } from './app.routing.module'
// Shared Module
import { SharedModule } from '../shared/shared.module'
// Pack Module
import { PacksModule } from '../packs/packs.module'
// NGRX
import { AppStoreModule } from '../store/store.module'

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    RouterModule,
    AppRoutingModule,
    ModuleMapLoaderModule,
    AppStoreModule,
    SharedModule,
    PacksModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppServerModule extends NgEngine {
  constructor() {
    super()
    console.log('App Module', this)
  }
}
