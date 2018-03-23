import { omit } from 'lodash'
/**
 * Interface for the NgPack base class
 */
export interface NgPack {
  config: Object
  pkg: { name?: 'string'}
  _actions: any
  _effects: any
  _reducers: any
}

/**
 * The NgPack base class
 */
export class NgPack {
  public _actions
  public _effects
  public _reducers

/**
 * Instantiate the ngPack and set some initial properties. All ngPacks
 * should implement their own constructors, and call super(app, pack) with
 * their own pack definitions. Implementing application logic in the ngPack
 * constructor is not recommended.
 */

  constructor (app, {config, pkg, actions, effects, reducers}) {
    Object.defineProperties(this, {
      app: {
        enumberable: false,
        writable: false,
        value: app
      },
      config: {
        value: config || {},
        enumerable: false
      },
      pkg: {
        value: Object.freeze(pkg),
        writable: false,
        enumerable: false
      },
      _actions: {
        value: actions || {},
        writable: true,
        enumerable: false
      },
      _effects: {
        value: effects || {},
        writable: true,
        enumerable: false
      },
      _reducers: {
        value: reducers || {},
        writable: true,
        enumerable: false
      }
    })
  }

  /**
   * Get the ID of the pack
   */
  get id(): string {
    return this.pkg.name.toLowerCase().replace('ng-pack-', '')
  }

  /**
   * Get the name of the pack
   */
  get name(): string {
    return this.pkg.name.toLowerCase().replace('ng-pack-', '')
  }

  /**
   * Get the type of the pack (Not Used Yet)
   */
  get type (): string {
    return 'misc'
  }

  get Actions (): any {
   return omit(this._actions, 'ActionTypes')
  }

  get ActionTypes (): any {
    return this._actions['ActionTypes']
  }

  get Selectors (): any {
    return omit(this._reducers, ['reducers', 'metaReducers'])
  }

  get Reducers (): any {
    return this._reducers['reducers']
  }

  get MetaReducers (): any {
    return this._reducers['metaReducers']
  }

  get Effects (): any {
    return this._effects
  }
}
