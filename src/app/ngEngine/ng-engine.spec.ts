import { NgEngine } from './'

// Environment Stub from  angular cli
import { environment } from '../../environments/environment'
// App Config for NgEngine
import * as appConfig from '../../appConfig'

describe('NgEngine', () => {
  it('should create an NgEngine instance', () => {
    expect(new NgEngine({environment, appConfig})).toBeTruthy()
  })
})
