import { Routes } from '@angular/router'

export interface NgPack {
  config: {
    name: string
    root: string
  }
  actions: any
  effects: any
  reducers: any
  routes: Routes
}

export class NgPack {
  public actions
  public effects
  public reducers
  public routes: Routes
/**
 * @constructor
 * @param app NgEngine instance
 * @param config The ngPack configuration (config/ folder)
 * @param actions
 * @param effects
 * @param reducers
 * @param routes
 *
 * Instantiate the ngPack and set some initial properties. All ngPacks
 * should implement their own constructors, and call super(app, pack) with
 * their own pack definitions. Implementing application logic in the ngPack
 * constructor is not recommended.
 */

  constructor (app, {config, actions, effects, reducers, routes}) {
    Object.defineProperties(this, {
      app: {
        enumberable: false,
        writable: false,
        value: app
      },
      config: {
        value: config,
        enumerable: false
      },
      actions: {
        value: actions,
        writable: true
      },
      effects: {
        value: effects,
        writable: true
      },
      reducers: {
        value: reducers,
        writable: true
      },
      routes: {
        value: routes,
        writable: true
      }
    })
    console.log(this)
  }

  get name() {
    return this.config.name.replace('Module', '')
  }

  getActions () {
    return this.actions
  }
  getEffects () {
    return this.effects
  }
  getReducers () {
    return this.reducers
  }
  getRoutes () {
   return this.routes
  }
}
