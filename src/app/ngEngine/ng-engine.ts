// Import NgEngineCore
import { Inject, Injectable, InjectionToken, Type } from '@angular/core'

// Config Class
import { NgEngineConfig } from './ng-engine.config'

// Configuration Interface
import { DefaultNgEngineConfiguration, NgEngineConfiguration } from './ng-engine.interface'
import { NgPack } from './ng-pack';

// For browsers/terminals that don't implement the debug method, log will be used instead.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log'

// Injection Token
export const ENGINE_CONFIG = new InjectionToken<NgEngineConfiguration>('ENGINE_CONFIG')

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
    const environment = _engine.appConfig.environment || DefaultNgEngineConfiguration

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
        value: {}
      },
      _models: {
        value: {}
      },
      _state: {
        value: {}
      }
    })

    // Load Packs
    this.config.get('main.packs').forEach((Pack: Type<NgPack>) => {
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
   */
  get development(): boolean {
    return this.environment === 'development'
  }
  /**
   * get if environment is production
   */
  get production(): boolean {
    return this.environment === 'production'
  }
  /**
   * get if environment is staging
   */
  get staging(): boolean {
    return this.environment === 'staging'
  }

  /**
   * get if environment is testing
   */
  get testing(): boolean {
    return this.environment === 'testing'
  }

  /**
   * get models
   */
  get models(): any {
    return this._models
  }

  /**
   * get packs
   */
  get packs(): any {
    return this._packs
  }

  /**
   * get state
   */
  get state(): any {
    return this._state
  }

  /**
   * Merge a Pack into Engine
   */
  private mergePack(pack): void {
    Object.assign(this._state, { [pack.id]: pack })
  }

  /**
   * Log Error
   */
  public error(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      (<any>console).error.apply(console, this._convertArguments(arguments))
    }
  }

  /**
   * Log Error
   */
  public warn(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      (<any>console).warn.apply(console, this._convertArguments(arguments))
    }
  }

  /**
   * Log Info
   */
  public info(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      const args = this._convertArguments(arguments)
      args.forEach(arg => {
        (<any>console).info.apply(console, arg)
      })
    }
  }

  /**
   * Log Debug
   */
  public debug(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      const args = this._convertArguments(arguments)
      args.forEach(arg => {
        (<any>console)[CONSOLE_DEBUG_METHOD].log.apply(console, arg)
      })
    }
  }

  /**
   * Log
   */
  public log(message?: any, ...optionalParams: any[]): void {
    if (!this.production) {
      const args = this._convertArguments(arguments)
      args.forEach(arg => {
        (<any>console).log.apply(console, arg)
      })
    }
  }

  private _convertArguments(args: any): any[] {
    if (typeof args === 'object' && args.length) {
      return Array.from(args).map(arg => {
        let obj
        try {
          obj = Object.values(arg) // JSON.stringify(Object.values(arg), 0, 2)
        }
        catch (e) {
          obj = [arg]
        }
        return obj
      })
    }
    else if (typeof args === 'object') {
      let obj
      try {
        obj = Object.values(args) // JSON.stringify(args, 0, 2)
      }
      catch (e) {
        obj = [args]
      }
      return [obj]
    }
    else {
      return [args]
    }
  }
}

// Export the Config and Interface
export { NgEngineConfig, NgEngineConfiguration }

