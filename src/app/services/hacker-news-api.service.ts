import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import { apiConstant } from '../_constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {
  private apiC = apiConstant;
  private count = 0;
  private limit = 0;

  constructor(private http: HttpClient) { }

  //TODO: remove type any
  //TODO: make topstories url a constant
  latestStories(): Observable<any> {
    return this.http.get<number[]>(`${this.apiC.root}/topstories.json`).pipe(
      switchMap((ids) => {
        return from(ids.slice(0, 5)).pipe(
          mergeMap(id => from(this.http.get(`${this.apiC.root}/item/${id}.json`))),
          toArray()
        )
      })
    )
  };
}
