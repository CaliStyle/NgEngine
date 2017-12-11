import { Store } from '@ngrx/store'

// import { packs } from '../packs/main'
import * as config from '../../appConfig'
import { NgConfig } from './ng-config'
// import * as fromRoot from '@app/reducers'
// import { app } from '@app/actions'

export class NgEngine {
  public config: NgConfig

  public packs: {}
  public models: {}
  public effects: {}
  public reducers: {}
  public actions: {}

  constructor() {
    Object.defineProperties(this, {
      env: {
        configurable: true,
        writable: false,
        value: config.environment
      },
      config: {
        value: new NgConfig(config, config.environment),
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
        value: { }
      },
      actions: {
        value: { }
      }
    })

    const packs = this.config.get('main.packs')
    console.log('PACKS', packs)

    packs.forEach(Pack => {
      try {
        const pack = new Pack(this)
        console.log(pack)
        this.packs[pack.name] = pack
        this.config.merge(pack.config)
        this.mergePack(pack)
      }
      catch (e) {
        console.log(e.stack)
        throw new Error('ng constructor')
        // throw new NgPackError(Pack, e, 'constructor')
      }
    })
  }

  private mergePack (pack) {

    Object.assign(this.actions, pack.actions)
    Object.assign(this.effects, pack.effects)
    Object.assign(this.models, pack.models)
    Object.assign(this.reducers, pack.reducers)

  }
}
