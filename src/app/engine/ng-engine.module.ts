import { NgModule, InjectionToken } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { StoreModule, ActionReducerMap, MetaReducer, META_REDUCERS } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'

// NgEngine for NgPacks
import { NgEngine } from './ng-engine'
import { NgEngineStore } from './ng-engine.store'
import { NgEngineService } from './ng-engine.service'

// Main Reducers
import { reducers, metaReducers } from '../store/reducers'

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>('Pack Reducers')
export function getReducers(ngEngine: NgEngine) {
  return Object.assign(reducers, ngEngine.reducers)
}

// export function getMetaReducers(ngEngine: NgEngine): MetaReducer[] {
//   // return array of meta reducers;
//   return []
// }

// export const EFFECTS_TOKEN = new InjectionToken('Pack Effects')
// export function getEffects(ngEngine: NgEngine) {
//   return [ngEngine.effects]
// }

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    StoreModule.forRoot(REDUCER_TOKEN, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  declarations: [],
  exports: [
    StoreModule
  ],
  providers: [
    NgEngine,
    NgEngineStore,
    NgEngineService,
    {
      provide: REDUCER_TOKEN,
      deps: [ NgEngine ],
      useFactory: getReducers
    },
    // {
    //   provide: EFFECTS_TOKEN,
    //   deps: [ NgEngine ],
    //   useFactory: getEffects
    // },
  ]
})
export class NgEngineModule {

}
