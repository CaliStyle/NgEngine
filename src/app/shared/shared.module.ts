import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Material
import {
  MatSidenavModule,
  MatButtonModule,
  MatCheckboxModule,
  MatListModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule
  ],
  declarations: []
})
export class SharedModule { }
