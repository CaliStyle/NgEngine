import { Store } from '@ngrx/store'

import { packs } from '../packs/main'
import * as config from '../../appConfig'
// import * as fromRoot from '@app/reducers'
// import { app } from '@app/actions'

export class NgEngine {
  public packs: {}
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
        configurable: true,
        writable: false,
        value: config.environment
      },
      // config: {
      //   value: new lib.Configuration(app.config, processEnv),
      //   configurable: true,
      //   writable: false
      // },
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
        console.log(pack)
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

    // this.store.dispatch(new app.LoadPackAction({pack: {id: pack.id, name: pack.name}}))
  }
}
