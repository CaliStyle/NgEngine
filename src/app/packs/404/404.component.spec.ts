import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { NgEngineModule } from '../../engine/ng-engine.module'
import { NgEngine } from '../../engine/ng-engine'
import { FourZeroFourComponent } from './404.component'

describe('FourZeroFourComponent', () => {
  let component: FourZeroFourComponent
  let fixture: ComponentFixture<FourZeroFourComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgEngineModule
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
