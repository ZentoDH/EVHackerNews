import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, switchMap, take, tap } from 'rxjs';
import { HackerNewsApiService } from '../services/hacker-news-api.service';
import { Story } from '../_models/story.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  // TODO: make interface
  pageType: any;

  private count: number = 20
  private offset: number = 0;
  stories: Story[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private hackerNewsApiService: HackerNewsApiService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap((data: any) => {
        this.pageType = data.type
        return this.hackerNewsApiService.getStories(this.count, this.offset, data.type)
      }),
      finalize(() => this.isLoading = false),
      take(1),
    ).subscribe(stories => this.stories = stories);
  }

  loadMore(): void {
    this.isLoading = true;
    this.offset = this.offset + this.count;
    this.hackerNewsApiService.getStories(this.count, this.offset, this.pageType).pipe(
      take(1),
      finalize(() => this.isLoading = false)
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
