import { createSelector, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../../../appConfig/app'
import * as fromApp from './app'

/**
 * Default State
 */
export interface State {
  [key: string]: Object
  app: fromApp.State
}

/**
 * Default Reducers
 */
export const reducers: ActionReducerMap<State> = {
  app: fromApp.reducer
}

export const getAppState = (state: State) => state.app

/**
 * TO CONSOLE Logger
 * @param {ActionReducer<{}>} reducer
 * @returns {ActionReducer<{}>}
 */
export function logger(reducer: ActionReducer<{}>): ActionReducer<{}> {
  return function(state: {}, action: any): {} {
    console.log('state', state)
    console.log('action', action)
    return reducer(state, action)
  }
}

/**
 * Meta Reducers
 */
export const metaReducers: MetaReducer<{}>[] = !environment.production
  ? [logger]
  : []
