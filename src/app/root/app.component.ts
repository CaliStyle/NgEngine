import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { NgEngineService } from '../ngEngine/ng-engine.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public title = ''
  public sidenav: {
    mode?: string,
    opened?: string,
    fixedInViewport?: boolean,
    fixedTopGap?: number,
    fixedBottomGap?: number
  } = {}

  constructor(
    private _ngEngine: NgEngineService
  ) { }

  ngOnInit() {
    this.sidenav = this._ngEngine.config.get('app.sidenav')
    this.title = this._ngEngine.config.get('app.title')
    this._ngEngine.dispatch('app', 'SetTitleAction', {title: this.title})
  }
}
