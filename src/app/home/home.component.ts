import { Component, HostListener, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { HackerNewsApiService } from '../services/hacker-news-api.service';
import { Story } from '../_models/story.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private count: number = 20
  private offset: number = 0;
  stories: Story[] = [];
  isLoading = true;

  constructor(private hackerNewsApiService: HackerNewsApiService) { }

  ngOnInit(): void {
    this.hackerNewsApiService.getLatestStories(this.count, this.offset).pipe(
      take(1),
      tap(() => this.isLoading = false)
    ).subscribe(stories => this.stories = stories);
  }

  loadMore(): void {
    this.isLoading = true;
    this.offset = this.offset + this.count;
    this.hackerNewsApiService.getLatestStories(this.count, this.offset).pipe(
      take(1),
      tap(() => this.isLoading = false)
    ).subscribe(stories =>  this.stories = [...this.stories, ...stories]);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (!this.isLoading && event.target.documentElement.offsetHeight + event.target.documentElement.scrollTop >= event.target.documentElement.scrollHeight - 300) {
      this.loadMore();
    }
  }

}
