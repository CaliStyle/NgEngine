import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { NgEngineModule } from '../engine/ng-engine.module'
import { NgEngineService } from '../engine/ng-engine.service'
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
        NgEngineModule
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
