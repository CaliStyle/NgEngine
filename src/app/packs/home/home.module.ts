import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { homeRouter } from './home.router'

@NgModule({
  imports: [
    CommonModule,
    homeRouter
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
