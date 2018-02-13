import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { NgEngineService } from '../../ngEngine'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public title: string
  public appState$: Observable<any>
  public homeState$: Observable<any>

  constructor(
    private _ngEngine: NgEngineService
  ) { }

  ngOnInit() {
    this.appState$ = this._ngEngine.select('getAppState')
    this.homeState$ = this._ngEngine.select('home', 'getHomeState')
    this.title = this._ngEngine.config.get('home.title')

    this._ngEngine.dispatch('home', 'HelloWorldAction', this.title)
    this._ngEngine.dispatch('home', 'TrailsAction', null)

  }
}
