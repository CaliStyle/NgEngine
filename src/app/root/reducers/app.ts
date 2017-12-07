import { createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { app } from '../actions'

export interface App {
  id: string
  name: string
}

export interface State extends EntityState<App> {}
export const adapter: EntityAdapter<App> = createEntityAdapter<App>()
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
})


export function reducer(state = initialState, action: app.Actions): State {
  switch (action.type) {
    case app.ActionTypes.LOAD_PACK: {
      return adapter.addOne(action.payload.pack, state)
    }

    default: {
      return state
    }
  }
}
