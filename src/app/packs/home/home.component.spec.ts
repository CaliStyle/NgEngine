import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule, Store } from '@ngrx/store'
import * as fromRoot from '../../store/reducers'
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
  // it(`should have as title 'Proxy Engine with Angular'`, async(() => {
  //   const app = fixture.debugElement.componentInstance
  //   expect(app.title).toEqual('Proxy Engine with Angular')
  // }))
  // it('should render title in a h1 tag', async(() => {
  //   const compiled = fixture.debugElement.nativeElement
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to Proxy Engine with Angular!')
  // }))
})
