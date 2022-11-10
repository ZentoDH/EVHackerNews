import { Component } from '@angular/core';
import { routingConstant } from './_constants/routing.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackerNews';

  readonly routing = routingConstant.pages;
}
