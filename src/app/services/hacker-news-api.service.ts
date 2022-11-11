import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, mergeMap, Observable, switchMap, tap, toArray } from 'rxjs';
import { apiConstant } from '../_constants/api.constants';
import { State } from '../_enums/state.enum';
import { Story } from '../_models/story.model';
@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {
  private apiC = apiConstant;
  private idCache: {
    top: number[];
    new: number[];
    best: number[];
  } = {
    top: [],
    new: [],
    best: [],
  }

  constructor(private http: HttpClient) { }

  getStories(count: number, offset: number, type: State): Observable<Story[]> {
    if (!this.idCache[type].length) {
      return this.http.get<number[]>(`${this.apiC.root}/${type}stories.json`).pipe(
        switchMap((ids) => {
          console.log('got new ids', ids)
          this.idCache[type] = ids;
          return this.getStoriesDetails(ids, count, offset);
        })
      )
    } else {
      if ((count + offset) > (this.idCache[type].length)) {
        alert('End of the stories')
      }
      return this.getStoriesDetails(this.idCache[type], count, offset);
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
