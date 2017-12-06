import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FiveZeroZeroComponent } from './500.component'
import { fiveZeroZeroRouter } from './500.router'

@NgModule({
  imports: [
    CommonModule,
    fiveZeroZeroRouter
  ],
  declarations: [
    FiveZeroZeroComponent
  ]
})
export class FiveZeroZeroModule { }
