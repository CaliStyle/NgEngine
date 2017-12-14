import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// NgEngine for NgPacks
import { NgEngine } from './ng-engine'
import { NgEngineStore } from './ng-engine.store'
import { NgEngineService } from './ng-engine.service'
import { AppStoreModule } from '../store/store.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AppStoreModule
  ],
  declarations: [],
  providers: [
    { provide: 'ngEngine', useClass: NgEngine },
    { provide: 'ngEngineStore', useClass: NgEngineStore },
    NgEngineService
  ]
})
export class NgEngineModule {

}
