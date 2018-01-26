import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { NgEngineModule, NgEngineService } from '../ngEngine'
// Environment Stub from  angular cli
import { environment } from '../../environments/environment'
// App Config for NgEngine
import * as appConfig from '../../appConfig'
import * as fromRootReducers from './store/reducers'
import * as fromRootActions from './store/actions'
// Shared Module
import { SharedModule } from '../shared/shared.module'
// For Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Component to Test
import { AppComponent } from './app.component'


describe('AppComponent', () => {
  let component: AppComponent
  let location: Location
  let router: Router
  let fixture: ComponentFixture<AppComponent>
  let ngEngineService: NgEngineService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NgEngineModule.forRoot({environment, appConfig, fromRootReducers, fromRootActions}),
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [ AppComponent ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    ngEngineService = TestBed.get(NgEngineService)
    spyOn(ngEngineService, 'dispatch').and.callThrough()
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
