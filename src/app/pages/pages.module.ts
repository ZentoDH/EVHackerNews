import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PagesComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ToolbarComponent]
})
export class PagesModule { }
