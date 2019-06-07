import { NgPack } from '../../ngEngine'
import * as CONFIG from './config'
import PKG from './package.json'
import { ACTIONS, EFFECTS, REDUCERS } from './store'

export class Home extends NgPack {
  constructor(app) {
    super(app, {
      config: CONFIG,
      pkg: PKG,
      actions: ACTIONS,
      effects: EFFECTS,
      reducers: REDUCERS
    })
  }
}
