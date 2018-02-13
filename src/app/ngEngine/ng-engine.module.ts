import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { StoreModule, ActionReducerMap, MetaReducer, META_REDUCERS } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'

// NgEngine for NgPacks
import { NgEngine, NgEngineStore, NgEngineService, NgEngineConfig, NgEngineConfiguration } from './ng-engine.service'
import { NgPack } from './ng-pack'

export function getEngineFactory(config) {
  return new NgEngine(config)
}

// Return Root Reducers with Pack Reducers
export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>('REDUCER_TOKEN')
export function getReducersFactory(ngEngine: NgEngine) {
  return ngEngine.reducers
}

// Return Root Meta Reducers with Pack Meta Reducers
export function getMetaReducersFactory(ngEngine: NgEngine): MetaReducer<{}>[] {
  return ngEngine.metaReducers
}

// Return Root Routes
export const ROUTES_TOKEN: InjectionToken<Routes[]> = new InjectionToken<Routes[]>('ROUTES_TOKEN')
export function getRoutesFactory(ngEngine: NgEngine) {
  return ngEngine.routes
}

// Return Root Effects with Pack Effects
// export const EFFECTS_TOKEN = new InjectionToken<any>('EFFECTS_TOKEN')
// export function getEffectsFactory(ngEngine: NgEngine): Array<any> {
//   const effects = Object.values(ngEngine.effects)
//   console.log('TOKEN', effects)
//   return effects
// }

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  declarations: [],
  exports: [
    StoreModule,
    EffectsModule
  ]
})
export class NgEngineModule {
  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: NgEngineModule,
      providers: [
        {
          provide: 'ENGINE_TOKEN',
          useValue: config
        },
        {
          provide: NgEngine,
          useFactory: getEngineFactory,
          deps: ['ENGINE_TOKEN']
        },
        NgEngineService,
        NgEngineStore,
        {
          provide: REDUCER_TOKEN,
          deps: [ NgEngine ],
          useFactory: getReducersFactory
        },
        {
          provide: META_REDUCERS,
          deps: [ NgEngine ],
          useFactory: getMetaReducersFactory
        },
        // {
        //   provide: EFFECTS_TOKEN,
        //   deps: [ NgEngine ],
        //   useFactory: getEffectsFactory
        // },
        {
          provide: ROUTES_TOKEN,
          deps: [ NgEngine ],
          useFactory: getRoutesFactory
        }
      ]
    }
  }
}

export {
  NgEngine,
  NgPack,
  NgEngineService,
  NgEngineStore,
  NgEngineConfig,
  NgEngineConfiguration
}
