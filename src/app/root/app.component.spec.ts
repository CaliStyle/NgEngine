import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { StoreModule, Store } from '@ngrx/store'
import { NgEngineModule } from '../engine/ng-engine.module'

import * as fromRoot from '../store/reducers'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  let component: AppComponent
  let location: Location
  let router: Router
  let fixture: ComponentFixture<AppComponent>
  let store: Store<fromRoot.State>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({
          ...fromRoot.reducers
        }),
        NgEngineModule
      ],
      declarations: [ AppComponent ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    store = TestBed.get(Store)
    spyOn(store, 'dispatch').and.callThrough()
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
