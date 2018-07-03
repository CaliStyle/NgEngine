import { Injectable, Optional, Inject } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { defer } from 'rxjs/observable/defer'
import { tap } from 'rxjs/operators'

import { NgEngineService } from '../../../../ngEngine/ng-engine.service'

@Injectable()
export class HomeEffects {

  private _baseRef

  constructor(
    private _ngEngine: NgEngineService,
    private http: HttpClient,
    private actions$: Actions,
    @Optional() @Inject(APP_BASE_HREF) origin: string
  ) {
    this._baseRef = origin || ''
  }
  // Dispatch just to let the console know we did
  @Effect({ dispatch: false }) init$: Observable<any> = defer(() => of(null)).pipe(
    tap(() => this._ngEngine.log('HomeEffects.init$', 'Home Effects Initiated')),
  )

  // Listen for the 'fabrix' actions
  @Effect() fabrix$: Observable<Action> = this.actions$.pipe(
    ofType('[Home] fabrix'),
    mergeMap(action =>
      this.http.get(`${this._baseRef }${ this._ngEngine.config.get('app.API_URL') }/default/info`).pipe(
        // If successful, dispatch success action with result
        map(data => {
          this._ngEngine.log('fabrix', data)
          return {type: '[Home] fabrix Success', payload: data}
        }),
        // If request fails, dispatch failed action
        catchError((err) => {
          console.log('fabrix ERROR', err)
          return of({ type: '[Home] fabrix Failed', payload: err })
        })// of({ type: '[Home] fabrix Failed', payload: err }))
      )
    )
  )
}
