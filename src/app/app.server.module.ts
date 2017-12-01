import { NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { AppModule } from './app.module'
import { AppRoutingModule } from './app.routing.module'

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    RouterModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppServerModule {}
