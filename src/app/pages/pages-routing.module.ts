import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingConstant } from '../_constants/routing.constants';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: routingConstant.pages.top,
    component: PagesComponent,
    data: { type: routingConstant.pages.top}
  },
  {
    path: routingConstant.pages.new,
    component: PagesComponent,
    data: { type: routingConstant.pages.new}
  },
  {
    path: routingConstant.pages.best,
    component: PagesComponent,
    data: { type: routingConstant.pages.best}
  },
  {path: '**', redirectTo: routingConstant.pages.top, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
