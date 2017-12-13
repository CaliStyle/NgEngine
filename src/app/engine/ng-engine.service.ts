import { Injectable } from '@angular/core'
import { NgEngine } from './ng-engine'
import { Action, Store } from '@ngrx/store'

import * as fromRoot from '../store/reducers'
import * as Actions from '../store/actions'

// const engine = new NgEngine()

@Injectable()
export class NgEngineService {
  private ngEngine

  constructor(
    protected _store: Store<fromRoot.State>
  ) {
    this.ngEngine = new NgEngine()

    for (const p in this.ngEngine.packs) {
      if (!this.ngEngine.packs.hasOwnProperty(p)) {
        continue
      }
      const pack = this.ngEngine.packs[p]
      this.dispatch('app', 'LoadPackAction', { pack: { id: pack.id, name: pack.name }})
    }
    console.log('ngEngine', this.ngEngine)
  }

  get engine() {
    return this.ngEngine
  }

  get config() {
    return this.engine.config
  }

  get environment() {
    return this.engine.environment
  }
  get isProduction() {
   return this.environment === 'production'
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
   * @param {string | Action} action
   * @param {string} type
   * @param params
   */
  dispatch(action: any, type?: string, params?: any[] | {[key: string]: any}) {
    if (typeof <Action>action === 'object') {
      return this.store.dispatch(action)
    }
    else if (typeof <string>action === 'string') {
      try {
        return this.store.dispatch(new Actions[action][type](params))
      }
      catch (err) {
        if (!this.isProduction) {
          console.log(err)
        }
      }
    }
    else {
      throw new Error('Action should be an object or a string')
    }
  }
}
