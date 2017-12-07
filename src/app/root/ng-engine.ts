import { Store } from '@ngrx/store'

import { packs } from '../packs/main'
import { NgPack } from './ng-pack'
import { environment } from '../../appConfig/app'
import * as config from '../../appConfig'
// import * as fromRoot from '@app/reducers'
// import { app } from '@app/actions'

export class NgEngine {
  public packs: {}
  public routes: {}
  public models: {}
  public effects: {}
  public reducers: {}
  public actions: {}

  constructor() {
    // this.store = Store // <fromRoot.State>

    Object.defineProperties(this, {
      config: {
        value: config,
        configurable: true,
        writable: false
      },
      env: {
        enumerable: false,
        value: environment
      },
      // config: {
      //   value: new lib.Configuration(app.config, processEnv),
      //   configurable: true,
      //   writable: false
      // },
      packs: {
        value: { }
      },
      routes: {
        value: { }
      },
      models: {
        value: { }
      },
      effects: {
        value: { }
      },
      reducers: {
        value: { }
      },
      actions: {
        value: { }
      }
    })

    // const packs = []

    packs.forEach(Pack => {
      try {
        const pack = new Pack(this)
        this.packs[pack.name] = pack
        // this.config.merge(pack.config)
        this.mergePack(pack)
      }
      catch (e) {
        console.log(e.stack)
        throw new Error('ng constructor')
        // throw new NgPackError(Pack, e, 'constructor')
      }
    })
  }

  // private mergePack (pack = {routes: {}, models: {}, effects: {}, reducers: {}, actions: {}}) {
  private mergePack (pack) {

    Object.assign(this.actions, pack.actions)
    Object.assign(this.effects, pack.effects)
    Object.assign(this.models, pack.models)
    Object.assign(this.reducers, pack.reducers)
    Object.assign(this.routes, {[pack.name]: pack.routes})

    // this.store.dispatch(new app.LoadPackAction({pack: {id: pack.id, name: pack.name}}))
  }
}
