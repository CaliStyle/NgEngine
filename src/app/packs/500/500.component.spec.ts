import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'

// NgEngine Module
import {
  NgEngineModule,
  NgEngineService,
  ENGINE_CONFIG
} from '../../ngEngine'
// App Config for NgEngine
import * as appConfig from '../../../appConfig'

// 500 Component
import { FiveZeroZeroComponent } from './500.component'

describe('FiveZeroZeroComponent', () => {
  let component: FiveZeroZeroComponent
  let fixture: ComponentFixture<FiveZeroZeroComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:  [
        RouterTestingModule,
        StoreModule.forRoot({}),
        NgEngineModule
      ],
      declarations: [ FiveZeroZeroComponent ],
      providers: [
        {
          provide: ENGINE_CONFIG,
          useValue: {
            appConfig: appConfig
          }
        }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveZeroZeroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
