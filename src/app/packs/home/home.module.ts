import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SharedModule } from '../../shared/shared.module'
import { HomeComponent } from './home.component'
import { homeRouter } from './home.router'

// Effects for Pack
import { HomeEffects } from './store/effects/home'
// Reducers for Pack
import { reducers } from './store/reducers'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    homeRouter,
    StoreModule.forFeature('home', reducers.home),
    EffectsModule.forFeature([ HomeEffects ]),
  ],
  declarations: [
    HomeComponent
  ],
  entryComponents: [
    HomeComponent
  ]
})
export class HomeModule { }
