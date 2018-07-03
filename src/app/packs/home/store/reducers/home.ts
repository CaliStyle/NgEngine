import { actions } from '../actions'

export interface State {
  title: string | null,
  fabrix: {
    app?: string
    libs?: {}
    node?: string
    spools?: any[]
  }
  loading: boolean
  error: string | null
}

export const initialState: State = {
  title: null,
  fabrix: {},
  loading: false,
  error: null
}


export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.HELLO_WORLD: {
      return Object.assign({}, state, {title: action.payload })
    }
    case actions.ActionTypes.fabrix: {
      return Object.assign({}, state, {loading: true })
    }
    case actions.ActionTypes.fabrix_SUCCESS: {
      return Object.assign({}, state, {loading: false, fabrix: action.payload })
    }
    case actions.ActionTypes.fabrix_FAILED: {
      return Object.assign({}, state, {loading: false, error: action.payload })
    }
    default: {
      return state
    }
  }
}
