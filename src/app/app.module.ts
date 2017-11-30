import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'proxy-engine-ng'
    }),
    HttpClientModule,
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
