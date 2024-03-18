import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { News } from '../model/news';
import { Sources } from '../model/sources';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '807f540d3d334a628346279f94933ae3';
  private apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  getNewsTopHeadline(): Observable<News[]> {
    return this.http
      .get<any>(`${this.apiUrl}/top-headlines?country=id&apiKey=${this.apiKey}`)
      .pipe(
        map((response: any) => {
          return response.articles.slice(0, 5);
        })
      );
  }

  getNewsSource(): Observable<News[]> {
    return this.http
      .get<any>(`${this.apiUrl}/everything?q=bitcoin&apiKey=${this.apiKey}`)
      .pipe(
        map((response: any) => {
          return response.articles.slice(0, 6);
        })
      );
  }

  getChannel(): Observable<Sources[]> {
    return this.http
      .get<any>(
        `${this.apiUrl}/top-headlines/sources?apiKey=${this.apiKey}&pageSize=8`
      )
      .pipe(
        map((response: any) => {
          return response.sources.slice(0, 8);
        })
      );
  }
}
