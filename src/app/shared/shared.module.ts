import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { reducers, metaReducers } from './reducers/reducers'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    // Note that you must instrument after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, //  Retains last 25 states
      // name: 'ngEngine'
    })
  ],
  exports: [
    StoreModule,
    StoreDevtoolsModule
  ],
  declarations: []
})
export class SharedModule { }
