import { Injectable, Inject, forwardRef } from '@angular/core'
// import { Store } from '@ngrx/store'
import { NgEngine, NgEngineConfig, NgEngineConfiguration, ENGINE_CONFIG } from './ng-engine'


@Injectable()
export class NgEngineService {
  constructor(
    @Inject(forwardRef(() => NgEngine)) protected ngEngine: NgEngine,
    // protected _store: Store<any>
) {
    // Log the configuration
    this.log(this.ngEngine)

    // Dispatch to the Store that packs have been loaded
    // for (const p in this.ngEngine.packs) {
    //   if (!this.ngEngine.packs.hasOwnProperty(p)) {
    //     continue
    //   }
    //   // Dispatch loaded pack and it's config
    //   const pack = this.ngEngine.packs[p]
    //   this.dispatch('app', 'LoadPackAction', {
    //     pack: {
    //       id: pack.id,
    //       name: pack.name,
    //       config: pack.config
    //     }
    //   })
    // }
    // // Dispatch that packs have finished loading
    // this.dispatch('app', 'LoadPacksCompleteAction', true)
  }

  /**
   * Get Alias of engine
   */
  get engine(): NgEngine {
    return this.ngEngine
  }

  /**
   * Get Engine Config
   */
  get config(): NgEngineConfig {
    return this.engine.config
  }

  /**
   * Get Engine Enviroment
   * @returns {any | string}
   */
  get environment(): any {
    return this.engine.environment
  }

  /**
   * Get Engine state
   */
  get state(): any {
    return this.ngEngine.state
  }

  // /**
  //  * Get Engine NGRX Store
  //  * @returns {Store<State>}
  //  */
  // get store(): any {
  //   return this._store
  // }

  /**
   * Log Items to engine log
   * @param message
   * @param optionalParams
   */
  public log(message: any, ...optionalParams: any[]): any {
    return this.engine.log(arguments)
  }

  // /**
  //  * Alias of Store.select
  //  * Determines if this is a Root Select or a Feature Select of State
  //  * @param state
  //  * @param featureSelect
  //  * @returns {Store<any>}
  //  */
  //
  // select(state: any, featureSelect?: any ): any {
  //   console.log('SELECT', state, featureSelect)
  //   try {
  //     if (this.state[state] && this.state[state].selectable[featureSelect]) {
  //       return this.store.select(this.state[state].selectable[featureSelect])
  //     }
  //     else {
  //       return this.store.select(state)
  //     }
  //   }
  //   catch (err) {
  //     this.engine.error(err)
  //   }
  // }
  //
  // /**
  //  * Alias of Store.dispatch
  //  * Determines if this is a Root Dispatch or a Feature Dispatch
  //  * @param args
  //  * @param {string} action
  //  * @param params
  //  */
  // // dispatch(feature: any, action?: string, params?: boolean | string | any[] | {[key: string]: any}): void {
  // dispatch(...args): void {
  //   const feature = args[0]
  //   const action = args[1]
  //   const params = args[2]
  //
  //   console.log('DISPATCH', feature, action, params)
  //   try {
  //     if (typeof feature === 'object') {
  //       return this.store.dispatch(feature)
  //     }
  //     else if (typeof feature === 'string') {
  //       if (this.state[feature] && this.state[feature].dispatchable[action]) {
  //         return this.store.dispatch(new this.state[feature].dispatchable[action](params))
  //       }
  //     }
  //     else {
  //       return this.store.dispatch({type: feature, payload: action})
  //       // throw new Error('Action should be an object or a string')
  //     }
  //   }
  //   catch (err) {
  //     this.engine.error(err)
  //   }
  // }
}

// Export Engine, Store, Config, and the Configuration interface
export {
  NgEngine,
  NgEngineConfig,
  NgEngineConfiguration,
  ENGINE_CONFIG
}
