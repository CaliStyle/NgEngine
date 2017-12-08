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
}
