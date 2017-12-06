import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FourZeroFourComponent } from './404.component'
import { fourZeroFourRouter } from './404.router'

@NgModule({
  imports: [
    CommonModule,
    fourZeroFourRouter
  ],
  declarations: [
    FourZeroFourComponent
  ]
})
export class FourZeroFourModule { }
