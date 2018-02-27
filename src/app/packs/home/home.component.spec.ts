import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule, combineReducers, Store } from '@ngrx/store'

// NgEngine Module
import { NgEngineModule, NgEngineService, ENGINE_CONFIG } from '../../ngEngine'
// Environment shim from CLI
import { environment } from '../../../environments/environment'
// App Config for NgEngine
import * as appConfig from '../../../appConfig'

// Home Component
import { HomeComponent } from './home.component'

import * as home from './store/actions/home'
import * as fromHome from './store/reducers'

describe('HomeComponent', () => {
  let store: Store<fromHome.State>
  let component: HomeComponent
  let ngEngineService: NgEngineService
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(fromHome.reducers),
        NgEngineModule
        // other imports
      ],
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: ENGINE_CONFIG,
          useValue: {
            environment: environment,
            appConfig: appConfig
          }
        }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    store = TestBed.get(Store)
    spyOn(store, 'dispatch').and.callThrough()
    ngEngineService = TestBed.get(NgEngineService)
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  // it('should subscribe to published app state', async(() => {
  //   ngEngineService.dispatch('SetTitleAction', {title: 'Proxy Engine with Angular'})
  //   component.appState$.subscribe(data => {
  //     expect(data.title).toBe('Proxy Engine with Angular')
  //   })
  // }))
  //
  // it('should set h1 as appState$.title', async(() => {
  //   ngEngineService.dispatch('SetTitleAction', {title: 'Proxy Engine with Angular'})
  //   component.appState$.subscribe(data => {
  //     fixture.whenStable().then(() => {
  //       fixture.detectChanges()
  //       const compiled = fixture.debugElement.nativeElement
  //       expect(compiled.querySelector('h1').textContent).toContain('Proxy Engine with Angular')
  //     })
  //   })
  // }))

  it('should set h1 as appState$.title', async(() => {
    const title = ngEngineService.config.get('app.title')
    fixture.whenStable().then(() => {
      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement
      expect(compiled.querySelector('h1').textContent).toContain(title)
    })
  }))

  it('should set h2 as homeState$.title', async(() => {
    // const title = ngEngineService.config.get('home.title')
    // const action = new home.HelloWorldAction(title)
    // store.dispatch(action)
    // expect(store.dispatch).toHaveBeenCalledWith(action)

    component.homeState$.subscribe(data => {
      fixture.whenStable().then(() => {
        fixture.detectChanges()
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('h2').textContent).toContain(data.title)
      })
    })
  }))
})
