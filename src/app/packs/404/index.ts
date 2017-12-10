import { NgPack} from '../../engine/ng-pack'

import { ACTIONS } from './404.actions'
import { EFFECTS } from './404.effects'
import { REDUCERS } from './404.reducers'


export class FourZeroFour extends NgPack {
  constructor(app) {
    super(app, {
      config: {
        name: 'FourZeroFourModule',
        root: '404/404.module'
      },
      actions: ACTIONS,
      effects: EFFECTS,
      reducers: REDUCERS
    })
  }
}
