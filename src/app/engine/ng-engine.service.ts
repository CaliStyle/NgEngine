import { Injectable } from '@angular/core'
import { NgEngine } from './ng-engine'
import { Store } from '@ngrx/store'

import * as fromRoot from '../store/reducers'
import * as Actions from '../store/actions'

@Injectable()
export class NgEngineService {
  private ngEngine

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this.ngEngine = new NgEngine()
  }

  get engine() {
    return this.ngEngine
  }
  get actions() {
    return this.ngEngine.actions
  }
  get effects() {
    return this.ngEngine.effects
  }
  get reducers() {
    return this.ngEngine.reducers
  }
  get routes() {
    return this.ngEngine.routes
  }

  /**
   * Get ths NGRX Store
   * @returns {Store<State>}
   */
  get store() {
    return this._store
  }

  /**
   * Alias of Store
   * @param state
   * @returns {Store<any>}
   */
  select(state) {
    return this.store.select(fromRoot[state])
  }

  /**
   * Alias of Store.dispatch
   * @param {string} store
   * @param {string} action
   * @param params
   */
  dispatch(action: string, type: string, params: any) {
    return this.store.dispatch(new Actions[action][type](params))
  }
}
