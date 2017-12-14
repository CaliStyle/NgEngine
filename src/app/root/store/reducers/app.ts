import { createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { app } from '../actions'

export interface App {
  id: string
  name: string
  config: Object
}

export interface State extends EntityState<App> {
  title: string | null
}

export const adapter: EntityAdapter<App> = createEntityAdapter<App>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  title: null
})


export function reducer(state = initialState, action: app.Actions): State {
  switch (action.type) {
    case app.ActionTypes.SET_TITLE: {
      return Object.assign({}, state, {title: action.payload.title})
    }
    case app.ActionTypes.LOAD_PACK: {
      return adapter.addOne(action.payload.pack, state)
    }
    case app.ActionTypes.UNLOAD_PACK: {
      return adapter.removeOne(action.payload.id, state)
    }

    default: {
      return state
    }
  }
}

export const getTitle = (state: State) => state.title
