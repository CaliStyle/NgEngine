import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

// NgEngine Module
import { NgEngineModule, NgEngineService } from '../../ngEngine'
// NgEngine Initial State
import * as ngEngineConfig from '../../root/app.ng-engine-config'
// 404 Component
import { FourZeroFourComponent } from './404.component'

describe('FourZeroFourComponent', () => {
  let component: FourZeroFourComponent
  let fixture: ComponentFixture<FourZeroFourComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgEngineModule.forRoot(ngEngineConfig.INITIAL_NG_ENGINE)
      ],
      declarations: [
        FourZeroFourComponent
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
