import { Injectable } from '@angular/core'
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
  constructor(
    private _ngEngine: NgEngineService,
    private http: HttpClient,
    private actions$: Actions
  ) {}
  // Dispatch just to let the console know we did
  @Effect({ dispatch: false }) init$: Observable<any> = defer(() => of(null)).pipe(
    tap(() => this._ngEngine.log('HomeEffects.init$', 'Home Effects Initiated')),
  )

  // Listen for the 'trails' actions
  @Effect() trails$: Observable<Action> = this.actions$.pipe(
    ofType('[Home] Trails'),
    mergeMap(action =>
      this.http.get(`${ this._ngEngine.config.get('app.API_URL') }/default/info`).pipe(
        // If successful, dispatch success action with result
        map(data => ({ type: '[Home] Trails Success', payload: data })),
        // If request fails, dispatch failed action
        catchError((err) => of({ type: '[Home] Trails Failed', payload: err }))
      )
    )
  )
}
