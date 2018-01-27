import { NgEngine } from './'

// Environment Stub from  angular cli
import { environment } from '../../environments/environment'
// App Config for NgEngine
import * as appConfig from '../../appConfig'
import * as fromRootReducers from '../root/store/reducers'
import * as fromRootActions from '../root/store/actions'


describe('NgEngine', () => {
  it('should create an NgEngine instance', () => {
    expect(new NgEngine({environment, appConfig, fromRootReducers, fromRootActions})).toBeTruthy()
  })
})
