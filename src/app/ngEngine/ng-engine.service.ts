import { Injectable, Inject, forwardRef } from '@angular/core'
import { NgEngine, NgEngineConfig, NgEngineConfiguration } from './ng-engine'
import { NgEngineStore } from './ng-engine.store'
import { Action, ActionReducer } from '@ngrx/store'

@Injectable()
export class NgEngineService {
  constructor(
    /// config: NgEngineConfiguration
    @Inject(forwardRef(() => NgEngine)) protected ngEngine: NgEngine,
    // protected ngEngine: NgEngine,
    protected _store: NgEngineStore
) {
    // Log the configuration
    this.log(this.ngEngine)

    // Dispatch to the Store that packs have been loaded
    for (const p in this.ngEngine.packs) {
      if (!this.ngEngine.packs.hasOwnProperty(p)) {
        continue
      }
      // Dispatch loaded pack and it's config
      const pack = this.ngEngine.packs[p]
      this.dispatch('app', 'LoadPackAction', {
        pack: {
          id: pack.id,
          name: pack.name,
          config: pack.config
        }
      })
    }
    // Dispatch that packs have finished loading
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
   * Get Engine state
   */
  get state() {
    return this.ngEngine.state
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
   * @param message
   * @param optionalParams
   */
  public log(message: any, ...optionalParams: any[]) {
    return this.engine.log(arguments)
  }

  /**
   * Alias of Store.select
   * Determines if this is a Root Select or a Feature Select of State
   * @param state
   * @param featureState
   * @returns {Store<any>}
   */
  // select(state: string|ActionReducer<any, Action>, featureState?: string ) {
  select(state: any, featureState?: any ) {
    const fromPackRoot = this.state
    try {
      if (this.engine.rootReducers && this.engine.rootReducers[state]) {
        return this.store.select(this.engine.rootReducers[state])
      }
      else if (fromPackRoot && fromPackRoot[state][featureState]) {
        return this.store.select(fromPackRoot[state][featureState])
      }
      else {
        throw new Error(`${state} is not in root state or pack state`)
      }
    }
    catch (err) {
      this.engine.error(err)
    }
  }

  /**
   * Alias of Store.dispatch
   * Determines if this is a Root Dispatch or a Feature Dispatch
   * @param {string | Action} action
   * @param {string} type
   * @param params
   */
  dispatch(action: any, type?: string, params?: boolean | string | any[] | {[key: string]: any}) {
    if (typeof action === 'object') {
      return this.store.dispatch(action)
    }
    else if (typeof action === 'string') {
      try {
        if (this.engine.rootActions && this.engine.rootActions[action]) {
          return this.store.dispatch(new this.engine.rootActions[action][type](params))
        }
        else if (this.actions[action]) {
          return this.store.dispatch(new this.actions[action][type](params))
        }
        else {
          throw new Error(`${action} is not a registered action`)
        }
      }
      catch (err) {
        this.engine.error(err)
      }
    }
    else {
      throw new Error('Action should be an object or a string')
    }
  }
}

// Export Engine, Store, Config, and the Configuration interface
export {
  NgEngine,
  NgEngineStore,
  NgEngineConfig,
  NgEngineConfiguration
}
