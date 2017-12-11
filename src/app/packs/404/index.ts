import { NgPack} from '../../engine/ng-pack'
import * as CONFIG from './config'
import * as PKG from './package.json'
import { ACTIONS } from './404.actions'
import { EFFECTS } from './404.effects'
import { REDUCERS } from './404.reducers'

export class FourZeroFour extends NgPack {
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
