import { Action } from '@ngrx/store'
import { type } from './util'

export const ActionTypes = {
  LOAD_PACK: type('[App] Load Pack')
}


// App Load Pack
export class LoadPackAction implements Action {
  type = ActionTypes.LOAD_PACK
  constructor(public payload: {pack: any}) { }
}

export type Actions
  = LoadPackAction
