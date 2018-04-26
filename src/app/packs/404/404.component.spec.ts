import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'

// NgEngine Module
import { NgEngineModule, NgEngineService,
  ENGINE_CONFIG
} from '../../ngEngine'
// App Config for NgEngine
import * as appConfig from '../../../appConfig'

// 404 Component
import { FourZeroFourComponent } from './404.component'

describe('FourZeroFourComponent', () => {
  let component: FourZeroFourComponent
  let fixture: ComponentFixture<FourZeroFourComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        NgEngineModule
      ],
      declarations: [
        FourZeroFourComponent
      ],
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
    fixture = TestBed.createComponent(FourZeroFourComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
