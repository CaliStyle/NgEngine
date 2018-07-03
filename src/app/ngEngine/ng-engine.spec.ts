import { NgEngine } from './'

// App Config for NgEngine
import * as appConfig from '../../appConfig'

describe('NgEngine', () => {
  it('should create an NgEngine instance', () => {
    expect(new NgEngine({appConfig})).toBeTruthy()
  })
})
