import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  // TODO: make interface
  pageType: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // TODO: no type any
    this.route.data.pipe(take(1)).subscribe((data: any) => this.pageType = data.type);
  }

}
