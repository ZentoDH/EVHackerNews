import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [HomeComponent, ToolbarComponent],
  exports: []
})
export class HomeModule { }
