import { Action } from '@ngrx/store'
import { type } from '../../util'

export const ActionTypes = {
  SET_TITLE:   type('[App] Set Title'),
  LOAD_PACK:   type('[App] Load Pack'),
  UNLOAD_PACK: type('[App] Unload Pack')
}

// Set Title
export class SetTitleAction implements Action {
  type = ActionTypes.SET_TITLE
  constructor(public payload: any) { }
}

// App Load Pack
export class LoadPackAction implements Action {
  type = ActionTypes.LOAD_PACK
  constructor(public payload: {pack: any}) { }
}

// App Load Pack
export class UnloadPackAction implements Action {
  type = ActionTypes.LOAD_PACK
  constructor(public payload: {id: string}) { }
}

export type Actions
  = SetTitleAction
  | LoadPackAction
  | UnloadPackAction
