import { Routes } from '@angular/router'
//
// const Reflect = global['Reflect']
//
// export const defaultProps = {
//   id: undefined
//   name: undefined,
//   app: undefined,
//   config: {},
//   // get id() {
//   //   return this.config.name.replace('Module', '').toLowerCase()
//   // },
//   // name:
//   //   return this.config.name.replace('Module', '')
//   // },
//   actions: {},
//   effects: {},
//   reducers: {},
//   routes: []
// }
//
// export function NgPack(_props) {
//   const id = _props.config.name.replace('Module').toLowerCase()
//   const name = _props.config.name.replace('Module')
//   _props = Object.assign({}, defaultProps, _props, {name: name, id: id})
//   console.log('props',_props)
//   return function (cls) {
//     Reflect.defineMetadata('annotations', [_props], cls)
//   }
// }


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
 * @param config The NgPack configuration (config/ folder)
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
  }

  get id() {
    return this.config.name.replace('Module', '').toLowerCase()
  }
  get name() {
    return this.config.name.replace('Module', '')
  }
}
