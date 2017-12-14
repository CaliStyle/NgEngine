import {ModuleWithProviders, NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'

// NgEngine for NgPacks
import { NgEngine } from './ng-engine'
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
  providers: []
})
export class NgEngineModule {
  static forRoot(engine): ModuleWithProviders {
    // User config get logged here
    // console.log(engine)
    engine.log(engine)
    return {
      ngModule: NgEngineModule,
      providers: [NgEngineService, { provide: 'engine', useValue: engine }]
    };
  }
}
