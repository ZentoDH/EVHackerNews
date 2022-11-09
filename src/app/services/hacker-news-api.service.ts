import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, mergeMap, Observable, switchMap, tap, toArray } from 'rxjs';
import { apiConstant } from '../_constants/api.constants';
import { Story } from '../_models/story.model';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {
  private apiC = apiConstant;
  private idCache: number[] = [];

  constructor(private http: HttpClient) { }

  getLatestStories(count: number, offset: number): Observable<Story[]> {
    if (!this.idCache.length) {
      return this.http.get<number[]>(`${this.apiC.root}/topstories.json`).pipe(
        switchMap((ids) => {
          console.log('got new ids', ids)
          this.idCache = ids;
          return this.getStoriesDetails(ids, count, offset);
        })
      )
    } else {
      if ((count + offset) > (this.idCache.length)) {
        // TODO: notify user
        alert('found the end')
      }
      return this.getStoriesDetails(this.idCache, count, offset);
    }
  };

  getStoriesDetails(ids: number[], count: number, offset: number): Observable<Story[]> {
    const slicedIds = ids.slice(offset, offset + count);
    if (slicedIds.length) {
      return from(ids.slice(offset, offset + count)).pipe(
        mergeMap(id => from(this.http.get<Story>(`${this.apiC.root}/item/${id}.json`))),
        toArray()
      )
    } else { return from([]) }
  };
}
