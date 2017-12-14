import { NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { RouterModule } from '@angular/router'
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'

// NgEngine for NgPacks
import { NgEngine } from '../engine/ng-engine'
import { NgEngineModule } from '../engine/ng-engine.module'
// Root Module
import { AppModule } from './app.module'
// Root Component
import { AppComponent } from './app.component'
// Route Module
import { AppRoutingModule } from './app.routing.module'
// Shared Module
import { SharedModule } from '../shared/shared.module'
// NGRX Store
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
    NgEngineModule.forRoot(new NgEngine())
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppServerModule {

}
