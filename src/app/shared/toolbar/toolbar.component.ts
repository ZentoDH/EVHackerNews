import { Component, OnInit } from '@angular/core';
import { routingConstant } from 'src/app/_constants/routing.constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  readonly routing = routingConstant.pages;

  constructor() { }

  ngOnInit(): void {
  }

}
