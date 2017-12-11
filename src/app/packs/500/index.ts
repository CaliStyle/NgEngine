import { NgPack} from '../../engine/ng-pack'
import * as CONFIG from './config'
import * as PKG from './package.json'
import { ACTIONS } from './500.actions'
import { EFFECTS } from './500.effects'
import { REDUCERS } from './500.reducers'

export class FiveZeroZero extends NgPack {
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
