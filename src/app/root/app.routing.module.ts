import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/packs/home/home.module#HomeModule'
  },
  {
    path: '500',
    loadChildren: 'app/packs/500/500.module#FiveZeroZeroModule'
  },
  {
    path: '404',
    loadChildren: 'app/packs/404/404.module#FourZeroFourModule'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
