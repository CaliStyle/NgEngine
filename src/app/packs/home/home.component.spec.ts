import { TestBed, async } from '@angular/core/testing'
import { HomeComponent } from './home.component'
describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
    }).compileComponents()
  }))
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HomeComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
  it(`should have as title 'Proxy Engine with Angular'`, async(() => {
    const fixture = TestBed.createComponent(HomeComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('Proxy Engine with Angular')
  }))
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Proxy Engine with Angular!')
  }))
})
