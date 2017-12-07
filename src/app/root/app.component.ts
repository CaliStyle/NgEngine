import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromRoot from '../store/reducers'
import { app } from '../store/actions'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _store: Store<fromRoot.State>
  ) {
    console.log('AppComponent', this)
  }

  ngOnInit() {
    this._store.dispatch(new app.SetTitleAction({title: 'Proxy Engine with Angular'}))
  }
}
