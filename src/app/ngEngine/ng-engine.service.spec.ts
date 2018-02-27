import { TestBed, inject } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

// NGRX
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
// NgEngine
import { NgEngineModule, NgEngineService, ENGINE_CONFIG } from './'
// Environment Stub from  angular cli
import { environment } from '../../environments/environment'
// App Config for NgEngine
import * as appConfig from '../../appConfig'

describe('NgEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgEngineModule
      ],
      providers: [
        {
          provide: ENGINE_CONFIG,
          useValue: {
            environment: environment,
            appConfig: appConfig
          }
        }
      ]
    })
  })

  it('should be created', inject([NgEngineService], (service: NgEngineService) => {
    expect(service).toBeTruthy()
  }))
  it('should get engine', inject([NgEngineService], (service: NgEngineService) => {
    expect(service.engine).toBeTruthy()
  }))
  it('should get config from engine', inject([NgEngineService], (service: NgEngineService) => {
    expect(service.config.get('app.title')).toBeTruthy()
  }))
  // it('should get store', inject([NgEngineService], (service: NgEngineService) => {
  //   expect(service.store).toBeTruthy()
  // }))
  // it('should select from store', inject([NgEngineService], (service: NgEngineService) => {
  //   expect(service.select('getAppState')).toBeTruthy()
  // }))
  // it('should dispatch from store', inject([NgEngineService], (service: NgEngineService) => {
  //   expect(service.select('getAppState')).toBeTruthy()
  // }))
})
