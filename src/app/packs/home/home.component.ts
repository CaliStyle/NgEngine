import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Store, select } from '@ngrx/store'

import { NgEngineService } from '../../ngEngine'

import * as home from './store/actions/home'
import * as fromHome from './store/reducers'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public appTitle
  public homeState$: Observable<any>

  constructor(
    private _ngEngine: NgEngineService,
    private _store: Store<any>
  ) {
    this.appTitle = this._ngEngine.config.get('app.title')
    const title = this._ngEngine.config.get('home.title')
    this._store.dispatch(new home.HelloWorldAction(title))
    this._store.dispatch(new home.TrailsAction(null))
    this.homeState$ = this._store.pipe(select(fromHome.getHomeState))
  }

  ngOnInit() {}
}
