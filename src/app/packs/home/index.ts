import { NgPack} from '../../engine/ng-pack'
import * as CONFIG from './config'
import * as PKG from './package.json'
import { ACTIONS } from './home.actions'
import { EFFECTS } from './home.effects'
import { REDUCERS } from './home.reducers'

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
