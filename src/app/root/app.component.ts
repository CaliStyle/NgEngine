import { Component, OnInit } from '@angular/core'
import { NgEngineService } from '../engine/ng-engine.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _ngEngine: NgEngineService
  ) { }

  ngOnInit() {
    const title = this._ngEngine.config.get('title')
    this._ngEngine.dispatch('app', 'SetTitleAction', {title: title})
  }
}
