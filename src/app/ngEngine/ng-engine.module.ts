import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes, ROUTES } from '@angular/router'
import { StoreModule, ActionReducerMap, MetaReducer, META_REDUCERS } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'

// NgEngine for NgPacks
import { NgEngine, NgEngineStore, NgEngineService, NgEngineConfig, NgEngineConfiguration } from './ng-engine.service'
import { NgPack } from './ng-pack'

export const ENGINE = new InjectionToken<NgEngineConfiguration>('ENGINE_TOKEN')

// Return Root Reducers with Pack Reducers
export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>('REDUCER_TOKEN')
export function getReducers(ngEngine: NgEngine) {
  console.log('BROKE', ngEngine)
  return ngEngine.reducers
}

// Return Root Meta Reducers with Pack Meta Reducers
export function getMetaReducers(ngEngine: NgEngine): MetaReducer<{}>[] {
  return ngEngine.metaReducers
}

// Return Root Routes
export const ROUTES_TOKEN: InjectionToken<Routes[]> = new InjectionToken<Routes[]>('ROUTES_TOKEN')
export function getRoutes(ngEngine: NgEngine) {
  return ngEngine.routes
}
// export const EFFECTS_TOKEN = new InjectionToken<Array<any>>('Pack Effects')
// export function getEffects(ngEngine: NgEngine) {
//   return Object.values(ngEngine.effects)
// }

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot([]), // EFFECTS_TOKEN),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  declarations: [],
  exports: [
    StoreModule,
    // EffectsModule
  ],
  // providers: [
  //   // {
  //   //   provide: EFFECTS_TOKEN,
  //   //   deps: [ NgEngine ],
  //   //   useFactory: getEffects
  //   // }
  // ]
})
export class NgEngineModule {
  static forRoot(config: NgEngineConfiguration): ModuleWithProviders {
    return {
      ngModule: NgEngineModule,
      providers: [
        {
          provide: 'ENGINE',
          useValue: {
            environment: config.environment,
            appConfig: config.appConfig,
            fromRootReducers: config.fromRootReducers,
            fromRootActions: config.fromRootActions
          }
        },
        NgEngine,
        NgEngineStore,
        NgEngineService,
        {
          provide: REDUCER_TOKEN,
          deps: [ NgEngine ],
          useFactory: getReducers
        },
        {
          provide: META_REDUCERS,
          deps: [ NgEngine ],
          useFactory: getMetaReducers
        },
        {
          provide: ROUTES_TOKEN,
          deps: [ NgEngine ],
          useFactory: getRoutes
        }
        // {
        //   provide: NgEngine,
        //   // deps: [ ENGINE_TOKEN ],
        //   useClass: NgEngine
        // },
        // {
        //   provide: NgEngineService,
        //   deps: [ENGINE_TOKEN],
        //   useClass: NgEngineService
        // },
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
