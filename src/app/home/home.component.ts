import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { HackerNewsApiService } from '../services/hacker-news-api.service';
import { Story } from '../_models/story.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private count: number = 5
  private offset: number = 0;
  stories: Story[] = [];

  constructor(private hackerNewsApiService: HackerNewsApiService) { }

  ngOnInit(): void {
    this.hackerNewsApiService.getLatestStories(this.count, this.offset).pipe(
      take(1)
    ).subscribe(stories => this.stories = stories);
  }

  loadMore(): void {
    this.offset = this.offset + this.count;
    this.hackerNewsApiService.getLatestStories(this.count, this.offset).pipe(
      take(1)
    ).subscribe(stories =>  this.stories = [...this.stories, ...stories]);
  }

}
