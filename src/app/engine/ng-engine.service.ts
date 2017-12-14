import { Injectable, Inject } from '@angular/core'
import { Action, Store } from '@ngrx/store'

import { NgEngine } from './ng-engine'
import { NgEngineStore } from './ng-engine.store'

import * as fromRoot from '../store/reducers'
import * as Actions from '../store/actions'


@Injectable()
export class NgEngineService {
  constructor(
    @Inject('ngEngine') private ngEngine: NgEngine,
    @Inject('ngEngineStore') protected _store: NgEngineStore
  ) {
    // Dispatch to the Store that packs have been loaded
    for (const p in this.ngEngine.packs) {
      if (!this.ngEngine.packs.hasOwnProperty(p)) {
        continue
      }
      const pack = this.ngEngine.packs[p]
      this.dispatch('app', 'LoadPackAction', {
        pack: {
          id: pack.id,
          name: pack.name,
          config: pack.config
        }
      })
    }
    this.dispatch('app', 'LoadPacksCompleteAction', true)
  }

  /**
   * Get Alias of engine
   */
  get engine() {
    return this.ngEngine
  }

  /**
   * Get Engine Config
   */
  get config() {
    return this.engine.config
  }

  /**
   * Get Engine Enviroment
   * @returns {any | string}
   */
  get environment() {
    return this.engine.environment
  }

  /**
   * Get Engine is Production
   * @returns {boolean}
   */
  get isProduction() {
   return this.environment === 'production'
  }

  /**
   * Get Engine Actions
   */
  get actions() {
    return this.ngEngine.actions
  }

  /**
   * Get Engine Effects
   */
  get effects() {
    return this.ngEngine.effects
  }

  /**
   * Get Engine Reducers
   */
  get reducers() {
    return this.ngEngine.reducers
  }

  /**
   * Get Engine Routes
   */
  // get routes() {
  //   return this.ngEngine.routes
  // }

  /**
   * Get Engine NGRX Store
   * @returns {Store<State>}
   */
  get store() {
    return this._store
  }

  /**
   * Log Items to engine log
   * @param items
   */
  public log(...items) {
    return this.engine.log(items)
  }

  /**
   * Alias of Store.select
   * @param state
   * @returns {Store<any>}
   */
  select(state) {
    // const fromRoot = this.reducers
    return this.store.select(fromRoot[state])
  }

  /**
   * Alias of Store.dispatch
   * @param {string | Action} action
   * @param {string} type
   * @param params
   */
  dispatch(action: any, type?: string, params?: boolean | string | any[] | {[key: string]: any}) {
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
