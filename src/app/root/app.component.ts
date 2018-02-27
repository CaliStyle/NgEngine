import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { NgEngineService } from '../ngEngine'
import { Observable } from 'rxjs/Observable'

import { Store, select } from '@ngrx/store'
import * as app from './store/actions/app'
import * as fromApp from './store/reducers'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public appState$: Observable<any>
  public title: string
  public sidenav: {
    mode?: string,
    opened?: string,
    fixedInViewport?: boolean,
    fixedTopGap?: number,
    fixedBottomGap?: number
  }

  constructor(
    private _ngEngine: NgEngineService,
    private _store: Store<any>
  ) {
    this.sidenav = this._ngEngine.config.get('app.sidenav')
    this.title = this._ngEngine.config.get('app.title')

    this.appState$ = this._store.pipe(select(fromApp.getAppState))
    this._store.dispatch(new app.SetTitleAction({title: this.title}))
  }

  ngOnInit() {
  }
}
