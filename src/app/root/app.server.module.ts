import { NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { RouterModule } from '@angular/router'
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'

// NgEngine Initial State
import * as ngEngineConfig from './app.ng-engine-config'
// NgEngine for NgPacks
import { NgEngineModule } from '../ngEngine'
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


// WORKAROUND HERE FOR AOT
Object.assign(ngEngineConfig.NG_ENGINE_TOKEN, ngEngineConfig.INITIAL_NG_ENGINE)
// WORKAROUND HERE FOR AOT

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
    NgEngineModule.forRoot(ngEngineConfig.NG_ENGINE_TOKEN)
  ],
  providers: [
    ngEngineConfig.ngEngineProvider
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppServerModule {

}
