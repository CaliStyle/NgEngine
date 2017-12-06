import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store'
// import { AppState } from './app.states'
// import * as articleReducer from './article.reducer'
import { environment } from '../../../appConfig/app'

export const reducers: ActionReducerMap<{}> = { }

export function logger(reducer: ActionReducer<{}>): ActionReducer<{}> {
  return function(state: {}, action: any): {} {
    console.log('state', state)
    console.log('action', action)
    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<{}>[] = !environment.production
  ? [logger]
  : []
