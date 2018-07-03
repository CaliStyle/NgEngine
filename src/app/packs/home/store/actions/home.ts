import { Action } from '@ngrx/store'
import { type } from '../../../../utils/type.util'

export const ActionTypes = {
  HELLO_WORLD:    type('[Home] Hello World'),
  fabrix:         type('[Home] fabrix'),
  fabrix_SUCCESS: type('[Home] fabrix Success'),
  fabrix_FAILED:  type('[Home] fabrix Failed')
}

// Home Hello World
export class HelloWorldAction implements Action {
  type = ActionTypes.HELLO_WORLD
  constructor(public payload: any) { }
}

// Home fabrix
export class fabrixAction implements Action {
  type = ActionTypes.fabrix
  constructor(public payload: any) { }
}
export class fabrixSuccessAction implements Action {
  type = ActionTypes.fabrix_SUCCESS
  constructor(public payload: any) { }
}
export class fabrixFailedAction implements Action {
  type = ActionTypes.fabrix_FAILED
  constructor(public payload: any) { }
}

export type Actions
  = HelloWorldAction
  | fabrixAction
  | fabrixSuccessAction
  | fabrixFailedAction
