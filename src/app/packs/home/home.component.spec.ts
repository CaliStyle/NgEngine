import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { NgEngine } from '../../engine/ng-engine'
import { NgEngineModule } from '../../engine/ng-engine.module'
import { NgEngineService } from '../../engine/ng-engine.service'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let ngEngineService: NgEngineService
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgEngineModule.forRoot(new NgEngine())
        // other imports
      ],
      declarations: [ HomeComponent ]
    }).compileComponents()
  }))

  beforeEach(() => {
    ngEngineService = TestBed.get(NgEngineService)
    spyOn(ngEngineService, 'dispatch').and.callThrough()
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should subscribe to published app state', async(() => {
    ngEngineService.dispatch('app', 'SetTitleAction', {title: 'Proxy Engine with Angular'})
    component.state$.subscribe(data => {
      expect(data.title).toBe('Proxy Engine with Angular')
    })
  }))

  it('should set h1 as state$.title', async(() => {
    ngEngineService.dispatch('app', 'SetTitleAction', {title: 'Proxy Engine with Angular'})
    component.state$.subscribe(data => {
      fixture.whenStable().then(() => {
        fixture.detectChanges()
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('h1').textContent).toContain('Proxy Engine with Angular')
      })
    })
  }))
})
