import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromRoot from './reducers'
import { app } from './actions'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _store: Store<fromRoot.State>) {}

  ngOnInit() {
    this._store.dispatch(new app.LoadPackAction({pack: {id: 'test', name: 'test'}}))
  }
}
