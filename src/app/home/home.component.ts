import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { HackerNewsApiService } from '../services/hacker-news-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private hackerNewsApiService: HackerNewsApiService) { }

  ngOnInit(): void {
    this.hackerNewsApiService.latestStories().pipe(
      take(1)
    ).subscribe(res => console.log(res))
  }

}
