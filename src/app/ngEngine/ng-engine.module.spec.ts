import { NgEngineModule } from './'

describe('NgEngineModule', () => {
  let ngEngineModule: NgEngineModule

  beforeEach(() => {
    ngEngineModule = new NgEngineModule()
  })

  it('should create an instance', () => {
    expect(ngEngineModule).toBeTruthy()
  })
})
