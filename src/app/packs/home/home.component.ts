import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../store/reducers'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public state$: Observable<any>

  constructor(private _store: Store<fromRoot.State>) {
    this.state$ = _store.select(fromRoot.getAppState)
  }

  ngOnInit() {
  }
}
