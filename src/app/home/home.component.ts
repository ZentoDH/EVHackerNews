import { Component, HostListener, OnInit } from '@angular/core';
import { finalize, forkJoin, take, tap } from 'rxjs';
import { HackerNewsApiService } from '../services/hacker-news-api.service';
import { State } from '../_enums/state.enum';
import { Story } from '../_models/story.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topStories: Story[] = [];
  newStories: Story[] = [];
  bestStories: Story[] = [];
  isLoading: {
    top: boolean;
    new: boolean;
    best: boolean;
  } = {
    top: true,
    new: true,
    best: true,
  };

  constructor(private hackerNewsApiService: HackerNewsApiService) { }

  ngOnInit(): void {
    this.hackerNewsApiService.getStories(10, 0, State.top).pipe(
      take(1),
      finalize(() => this.isLoading[State.top] = false)
    ).subscribe(stories => this.topStories = stories);

    this.hackerNewsApiService.getStories(10, 0, State.new).pipe(
      take(1),
      finalize(() => this.isLoading[State.new] = false)
    ).subscribe(stories => this.newStories = stories);

    this.hackerNewsApiService.getStories(10, 0, State.best).pipe(
      take(1),
      finalize(() => this.isLoading[State.best] = false)
    ).subscribe(stories => this.bestStories = stories);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

}
