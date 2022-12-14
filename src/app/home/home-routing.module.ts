import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingConstant } from '../_constants/routing.constants';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: routingConstant.pages.root,
    loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
