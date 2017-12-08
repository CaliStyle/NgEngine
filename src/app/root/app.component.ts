import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromRoot from '../store/reducers'
import { app } from '../store/actions'

import { NgEngineService } from '../engine/ng-engine.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _store: Store<fromRoot.State>,
    private _engineService: NgEngineService
  ) { }

  ngOnInit() {
    this._store.dispatch(new app.SetTitleAction({title: 'Proxy Engine with Angular'}))
    const engine = this._engineService.engine
  }
}
