import { InjectionToken } from '@angular/core'
import { NgEngineConfiguration } from '../ngEngine'

// Environment Stub from  angular cli
import { environment } from '../../environments/environment'
// App Config for NgEngine
import * as appConfig from '../../appConfig'
import * as fromRootReducers from './store/reducers'
import * as fromRootActions from './store/actions'
import * as fromRootEffects from './store/effects'


export const NG_ENGINE_TOKEN = new InjectionToken<NgEngineConfiguration>('NG_ENGINE_TOKEN')

export const INITIAL_NG_ENGINE: NgEngineConfiguration = {
  environment: environment,
  appConfig: appConfig,
  fromRootReducers: fromRootReducers,
  fromRootActions: fromRootActions,
  fromRootEffects: fromRootEffects
}

export const ngEngineProvider = [
  { provide: NG_ENGINE_TOKEN, useValue: INITIAL_NG_ENGINE }
]
