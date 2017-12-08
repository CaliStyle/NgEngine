import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule, Store } from '@ngrx/store'
import * as fromRoot from '../../store/reducers'
import { app } from '../../store/actions'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {

  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let store: Store<fromRoot.State>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
        // other imports
      ],
      declarations: [
        HomeComponent
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    store = TestBed.get(Store)
    spyOn(store, 'dispatch').and.callThrough()
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', async(() => {
    expect(component).toBeTruthy()
  }))

  it('should subscribe to published app state', async(() => {
    store.dispatch(new app.SetTitleAction({title: 'Proxy Engine with Angular'}))
    component.state$.subscribe(data => {
      expect(data.title).toBe('Proxy Engine with Angular')
    })
  }))

  it('should set h1 as state$.title', async(() => {
    store.dispatch(new app.SetTitleAction({title: 'Proxy Engine with Angular'}))
    component.state$.subscribe(data => {
      fixture.whenStable().then(() => {
        fixture.detectChanges()
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('h1').textContent).toContain('Proxy Engine with Angular')
      })
    })
  }))
})
