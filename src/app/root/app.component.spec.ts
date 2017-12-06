import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'

import { AppComponent } from './app.component'

describe('AppComponent', () => {
  let component: AppComponent
  let location: Location
  let router: Router
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ AppComponent ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
