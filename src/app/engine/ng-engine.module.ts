import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// NgEngine for NgPacks
import { NgEngineService } from '../engine/ng-engine.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    NgEngineService
  ]
})
export class NgEngineModule { }
