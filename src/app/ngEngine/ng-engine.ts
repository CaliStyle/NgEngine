// Import Core
import { Injectable, Inject, InjectionToken } from '@angular/core'
import { omit, merge } from 'lodash'

// Config Class
import { NgEngineConfig } from './ng-engine.config'

// Configuration Interface
import { NgEngineConfiguration } from './ng-engine.interface'

// For browsers/terminals that don't implement the debug method, log will be used instead.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log'

// Injection Token
export const ENGINE_CONFIG = new InjectionToken<NgEngineConfiguration>('engineConfig')

@Injectable()
export class NgEngine {
  public config: NgEngineConfig
  public env: Object
  public environment: string
  public _packs: {}
  private _models: {}
  private _state: {}

  constructor(
    @Inject(ENGINE_CONFIG)
    protected _engine: NgEngineConfiguration
  ) {
    // Injected Environment or default values
    const environment = _engine.environment || {
      development: true,
      staging: false,
      testing: false,
      production: false
    }

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
        value: new NgEngineConfig(_engine.appConfig || {}, processEnv),
        configurable: true,
        writable: false
      },
      _packs: {
        value: { }
      },
      _models: {
        value: { }
      },
      _state: {
        value: {}
      }
    })

    // Load Packs
    this.config.get('main.packs').forEach(Pack => {
      try {
        const pack = new Pack(this)
        this._packs[pack.name] = pack
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
   * get models
   * @returns {boolean}
   */
  get models(): any {
    return this._models
  }

  /**
   * get models
   * @returns {boolean}
   */
  get packs(): any {
    return this._packs
  }

  /**
   * get state
   * @returns any
   */
  get state(): any {
    return this._state
  }

  /**
   * Merge a Pack into Engine
   * @param pack
   */
  private mergePack (pack): void {
    Object.assign(this._state, {[pack.id]: pack})
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
