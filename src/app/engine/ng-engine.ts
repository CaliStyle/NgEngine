import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { omit, merge } from 'lodash'

// Config and Config Class
import * as config from '../../appConfig'
import { NgConfig } from './ng-config'

// Root Reducers, Actions
import * as rootReducers from '../root/store/reducers'
import * as rootActions from '../root/store/actions'

export interface NgEngine {
  config: NgConfig
  packs: {}
  models: {}
  effects: {}
  reducers: ActionReducerMap<any>
  // metaReducers: MetaReducer<{}>[]
  state: {}
  actions: {}
  env: Object
  environment: string
}

// For browsers that don't implement the debug method, log will be used instead. Fixes #62.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log'

@Injectable()
export class NgEngine {
  public config: NgConfig

  public packs: {}
  public models: {}
  public effects: {}
  public reducers
  // public metaReducers: []
  public state: {}
  public actions: {}

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
      models: {
        value: { }
      },
      effects: {
        value: { }
      },
      reducers: {
        value: rootReducers.reducers
      },
      // metaReducers: {
      //   value: rootReducers.metaReducers
      // },
      state: {
        value: {root: omit(rootReducers, 'reducers', 'metaReducers')}
      },
      actions: {
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
        throw new Error('ng constructor')
        // throw new NgPackError(Pack, e, 'constructor')
      }
    })
  }

  /**
   * Merge a Pack into Engine
   * @param pack
   */
  private mergePack (pack) {

    Object.assign(this.actions, {[pack.id]: pack.actions})
    Object.assign(this.effects, pack.effects)
    // this.effects = pack.effects
    Object.assign(this.models,  pack.models)
    Object.assign(this.reducers,  pack.reducers['reducers'] || {})
    Object.assign(this.state, {[pack.id]: omit(pack.reducers, 'reducers')})
  }

  error(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      console.error.apply(console, arguments)
    }
  }

  warn(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      console.warn.apply(console, arguments)
    }
  }

  info(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      console.info.apply(console, arguments)
    }
  }

  debug(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      ( <any> console )[CONSOLE_DEBUG_METHOD].apply(console, arguments)
    }
  }

  log(message?: any, ...optionalParams: any[]) {
    if (!this.config.get('environment.production')) {
      console.log.apply(console, arguments)
    }
  }
}
