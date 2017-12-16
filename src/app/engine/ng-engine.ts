import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { omit, merge } from 'lodash'

// Config and Config Class
import * as config from '../../appConfig'
import { NgConfig } from './ng-config'

// Root Reducers, Actions
import * as rootReducers from '../root/store/reducers'
import * as rootActions from '../root/store/actions'

// For browsers that don't implement the debug method, log will be used instead.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log'

@Injectable()
export class NgEngine {
  public config: NgConfig
  public env: Object
  public environment: string
  public packs: {}

  private _actions: {}
  private _effects: {}
  private _metaReducers: MetaReducer<{}>
  private _models: {}
  private _reducers: ActionReducerMap<any>
  private _state: {}

  constructor() {

    const processEnv = Object.freeze(JSON.parse(JSON.stringify({})))

    Object.defineProperties(this, {
      env: {
        configurable: true,
        writable: false,
        value: processEnv
      },
      config: {
        value: new NgConfig(config, processEnv),
        configurable: true,
        writable: false
      },
      packs: {
        value: { }
      },
      _models: {
        value: { }
      },
      _effects: {
        value: { }
      },
      _reducers: {
        value: rootReducers.reducers
      },
      _metaReducers: {
        value: rootReducers.metaReducers
      },
      _state: {
        value: {root: omit(rootReducers, 'reducers', 'metaReducers')}
      },
      _actions: {
        value: rootActions
      }
    })

    this.config.get('main.packs').forEach(Pack => {
      try {
        const pack = new Pack(this)
        this.packs[pack.name] = pack
        this.config.merge(pack.config)
        this.mergePack(pack)
      }
      catch (e) {
        this.log(e.stack)
        throw new Error('ng new pack constructor')
        // throw new NgPackError(Pack, e, 'constructor')
      }
    })
  }

  get actions() {
    return this._actions
  }

  get effects() {
    return this._effects
  }

  get metaReducers() {
    return Object.values(this._metaReducers)
  }

  get models() {
    return this._models
  }

  get reducers() {
    return this._reducers
  }

  get state() {
    return this._state
  }

  /**
   * Merge a Pack into Engine
   * @param pack
   */
  private mergePack (pack) {

    Object.assign(this._actions, {[pack.id]: pack.actions})
    Object.assign(this._effects, pack.effects)
    Object.assign(this._models,  pack.models)
    Object.assign(this._reducers,  pack.reducers['reducers'] || {})
    Object.assign(this._metaReducers,  pack.reducers['metaReducers'] || {})
    Object.assign(this._state, {[pack.id]: omit(pack.reducers, ['reducers', 'metaReducers'])})
  }

  public error(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      console.error.apply(console, arguments)
    }
  }

  public warn(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      console.warn.apply(console, arguments)
    }
  }

  public info(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      console.info.apply(console, arguments)
    }
  }

  public debug(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      ( <any> console )[CONSOLE_DEBUG_METHOD].apply(console, arguments)
    }
  }

  public log(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      console.log.apply(console, arguments)
    }
  }
}
