// Angular Core
import {
  NgModule
} from '@angular/core'
// Angular Common
import {
  CommonModule
} from '@angular/common'
// Angular Router
import {
  RouterModule
} from '@angular/router'
// NgEngine
import {
  NgEngine,
  NgEngineService,
  NgEngineConfig,
  NgEngineConfiguration,
  ENGINE_CONFIG
} from './ng-engine.service'
// NgPack
import {
  NgPack
} from './ng-pack'

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [
    NgEngine,
    NgEngineService
  ]
})
export class NgEngineModule { }

export {
  NgEngine,
  NgPack,
  NgEngineService,
  NgEngineConfig,
  NgEngineConfiguration,
  ENGINE_CONFIG
}
