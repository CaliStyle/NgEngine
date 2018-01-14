import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { NgEngineModule } from '../../ngEngine'
// Environment Stub from  angular cli
import { environment } from '../../../environments/environment'
// App Config for NgEngine
import * as appConfig from '../../../appConfig'
import * as fromRootReducers from '../../root/store/reducers'
import * as fromRootActions from '../../root/store/actions'

import { FourZeroFourComponent } from './404.component'

describe('FourZeroFourComponent', () => {
  let component: FourZeroFourComponent
  let fixture: ComponentFixture<FourZeroFourComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgEngineModule.forRoot(environment, appConfig, fromRootReducers, fromRootActions)
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
