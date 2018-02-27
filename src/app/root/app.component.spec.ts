import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'

// NGRX
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { NgEngineModule, NgEngineService, ENGINE_CONFIG } from '../ngEngine'
// Environment shim from CLI
import { environment } from '../../environments/environment'
// App Config for NgEngine
import * as appConfig from '../../appConfig'

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
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgEngineModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [ AppComponent ],
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
      .compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    ngEngineService = TestBed.get(NgEngineService)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
