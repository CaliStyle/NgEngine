import { Injectable } from '@angular/core'
import { NgEngine } from './ng-engine'

@Injectable()
export class NgEngineService {
  private ngEngine

  constructor() {
    this.ngEngine = new NgEngine()
    console.log('Engine', this.ngEngine)
  }

  get engine() {
    return this.ngEngine
  }
  get actions() {
    return this.ngEngine.actions
  }
  get effects() {
    return this.ngEngine.effects
  }
  get reducers() {
    return this.ngEngine.reducers
  }
  get routes() {
    return this.ngEngine.routes
  }
}
