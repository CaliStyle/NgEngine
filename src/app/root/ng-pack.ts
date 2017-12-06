export class NgPack {
  public actions
  public effects
  public reducers
  public routes
/**
 * @constructor
 * @param app NgEngine instance
 * @param pack.config The ngPack configuration (config/ folder)
 * @param pack.routes
 * @param pack.actions
 *
 * Instantiate the ngPack and set some initial properties. All ngPacks
 * should implement their own constructors, and call super(app, pack) with
 * their own pack definitions. Implementing application logic in the ngPack
 * constructor is not recommended.
 */

// constructor (app, {config = { }, routes = [], actions = [], reducers = [], effects = [] }) {
  constructor (app, config: any) {
    Object.defineProperties(this, {
      app: {
        enumerable: false,
        writable: false,
        value: app
      },
      name: {
        value: config.config.name
      },
      // pkg: {
      //   value: Object.freeze(pkg),
      //   writable: false,
      //   enumerable: false
      // },
      // api: {
      //   value: api,
      //   writable: true
      // },
      actions: {
        value: []
      },
      effects: {
        value: []
      },
      reducers: {
        value: []
      },
      routes: {
        value: []
      },
      config: {
        value: config,
        enumerable: false
      }
    })
  }
  get name() {
    return this.name
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
