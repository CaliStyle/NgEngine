import { ROUTES } from './home.router'
import { ACTIONS } from './home.actions'
import { EFFECTS } from './home.effects'
import { REDUCERS } from './home.reducers'

export { ROUTES as routes }
export { ACTIONS as actions }
export { EFFECTS as effects }
export { REDUCERS as reducers }

export const config = {
  name: 'HomeModule',
  root: 'home/home.module'
}
