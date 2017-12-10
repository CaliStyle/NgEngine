import { Component, OnInit } from '@angular/core'
// import { Observable } from 'rxjs/Observable'
import { NgEngineService } from '../../engine/ng-engine.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public state$ // : Observable<any>

  constructor(private _ngEngine: NgEngineService) { }

  ngOnInit() {
    this.state$ = this._ngEngine.select('getAppState')
  }
}
