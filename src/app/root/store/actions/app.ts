import { Action } from '@ngrx/store'

export const enum ActionTypes {
  SET_TITLE = '[App] Set Title',
  LOAD_PACK = '[App] Load Pack',
  UNLOAD_PACK = '[App] Unload Pack',
  LOAD_PACKS_COMPLETE = '[App] Load Packs Complete'
}

// Set Title
export class SetTitleAction implements Action {
  type = ActionTypes.SET_TITLE
  constructor(public payload: any) { }
}

// App Load Pack
export class LoadPackAction implements Action {
  type = ActionTypes.LOAD_PACK
  constructor(public payload: { pack: any }) { }
}

// App Load Pack
export class UnloadPackAction implements Action {
  type = ActionTypes.LOAD_PACK
  constructor(public payload: { id: string }) { }
}

// App Load Packs Complete
export class LoadPacksCompleteAction implements Action {
  type = ActionTypes.LOAD_PACKS_COMPLETE
  constructor(public payload: boolean) { }
}

export type Actions
  = SetTitleAction
  | LoadPackAction
  | UnloadPackAction
  | LoadPacksCompleteAction
