// Import Core
import { Injectable, Inject } from '@angular/core'
import { Routes } from '@angular/router'
import { ActionReducerMap, MetaReducer, Action } from '@ngrx/store'
import { omit, merge } from 'lodash'

// Config Class
import { NgEngineConfig } from './ng-engine.config'

// Configuration Interface
import { NgEngineConfiguration } from './ng-engine.interface'

// For browsers/terminals that don't implement the debug method, log will be used instead.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log'

@Injectable()
export class NgEngine {
  public config: NgEngineConfig
  public env: Object
  public environment: string
  public packs: {}

  public rootReducers: any // ActionReducerMap<any>
  public rootActions: Action[] = []
  public rootEffects: any

  private _actions: {}
  private _effects: {}
  private _metaReducers: MetaReducer<{}>
  private _models: {}
  private _reducers: ActionReducerMap<any>
  private _state: {}
  private _routes // : Routes

  constructor(
    @Inject('ENGINE_TOKEN')
    private _engine: NgEngineConfiguration
  ) {
    // Injected Environment or default values
    const environment = _engine.environment || {
      development: true,
      staging: false,
      testing: false,
      production: false
    }

    // Injected Reducers, Actions or default values
    this.rootReducers = _engine.fromRootReducers || {}
    this.rootActions = _engine.fromRootActions || []
    this.rootEffects = _engine.fromRootEffects || []

    // Set environment string
    this.environment = this.environmentString(environment)

    // Freeze process environment
    const processEnv = Object.freeze(JSON.parse(JSON.stringify({
      APP_ENV: this.environment
    })))

    // Define initial properties
    Object.defineProperties(this, {
      env: {
        configurable: true,
        writable: false,
        value: processEnv
      },
      config: {
        value: new NgEngineConfig(_engine.appConfig, processEnv),
        configurable: true,
        writable: false
      },
      packs: {
        value: { }
      },
      _actions: {
        value: this.rootActions || {}
      },
      _effects: {
        value: this.rootEffects || {}
      },
      _metaReducers: {
        value: this.rootReducers.metaReducers || {}
      },
      _models: {
        value: { }
      },
      _reducers: {
        value: this.rootReducers.reducers || {}
      },
      _routes: {
        value: []// this.config.get('routes')
      },
      _state: {
        value: {root: omit(this.rootReducers, 'reducers', 'metaReducers')}
      }
    })

    // Assign routes from config
    Object.assign(this._routes, this.config.get('routes'))

    // Load Packs
    this.config.get('main.packs').forEach(Pack => {
      try {
        const pack = new Pack(this)
        this.packs[pack.name] = pack
        this.config.merge(pack.config)
        this.mergePack(pack)
      }
      catch (e) {
        this.error(e.stack)
        throw new Error('ng new pack constructor')
        // throw new NgPackError(Pack, e, 'constructor')
      }
    })
  }

  /**
   * get Environment as a string
   * @param env
   * @returns {string}
   */
  public environmentString(env): string {
    let e = 'development'
    if (env && env.production === true) {
      e = 'production'
    }
    else if (env && env.staging === true) {
      e = 'staging'
    }
    else if (env && env.testing === true) {
      e = 'testing'
    }
    return e
  }

  /**
   * get if environment is development
   * @returns {boolean}
   */
  get development(): boolean {
    return this.environment === 'development'
  }
  /**
   * get if environment is production
   * @returns {boolean}
   */
  get production(): boolean {
    return this.environment === 'production'
  }
  /**
   * get if environment is staging
   * @returns {boolean}
   */
  get staging(): boolean {
    return this.environment === 'staging'
  }

  /**
   * get if environment is testing
   * @returns {boolean}
   */
  get testing(): boolean {
    return this.environment === 'testing'
  }

  /**
   * get actions
   * @returns {boolean}
   */
  get actions(): any {
    return this._actions
  }

  /**
   * get effects
   * @returns {boolean}
   */
  get effects(): any {
    return this._effects
  }

  /**
   * get metaReducers
   * @returns {boolean}
   */
  get metaReducers(): any {
    return Object.values(this._metaReducers)
  }

  /**
   * get models
   * @returns {boolean}
   */
  get models(): any {
    return this._models
  }

  /**
   * get reducers
   * @returns {boolean}
   */
  get reducers(): any {
    return this._reducers
  }

  /**
   * get routes
   * @returns {boolean}
   */
  get routes(): Routes {
    return this._routes
  }

  /**
   * get state
   * @returns {boolean}
   */
  get state(): any {
    return this._state
  }

  /**
   * Merge a Pack into Engine
   * @param pack
   */
  private mergePack (pack): void {
    Object.assign(this._actions, {[pack.id]: pack.actions || {}})
    Object.assign(this._effects, pack.effects.effects || {})
    Object.assign(this._models,  pack.models || {})
    Object.assign(this._metaReducers,  pack.reducers['metaReducers'] || {})
    Object.assign(this._reducers,  pack.reducers['reducers'] || {})
    // Object.assign(this._routes, pack.routes)
    Object.assign(this._state, {[pack.id]: omit(pack.reducers, ['reducers', 'metaReducers'])})
  }

  /**
   * Log Error
   * @param message
   * @param optionalParams
   */
  public error(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      (<any>console).error.apply(console, arguments)
    }
  }

  /**
   * Log Error
   * @param message
   * @param optionalParams
   */
  public warn(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      (<any>console).warn.apply(console, arguments)
    }
  }

  /**
   * Log Info
   * @param message
   * @param optionalParams
   */
  public info(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      (<any>console).info.apply(console, arguments)
    }
  }

  /**
   * Log Debug
   * @param message
   * @param optionalParams
   */
  public debug(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      (<any>console)[CONSOLE_DEBUG_METHOD].apply(console, arguments)
    }
  }

  /**
   * Log
   * @param message
   * @param optionalParams
   */
  public log(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      (<any>console).log.apply(console, arguments)
    }
  }
}

// Export the Config and Interface
export { NgEngineConfig, NgEngineConfiguration }
