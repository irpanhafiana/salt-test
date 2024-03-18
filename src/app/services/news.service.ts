import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private endpoint = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {}

  getNews(): Observable<number[]> {
    return this.http.get<number[]>(`${this.endpoint}/topstories.json`);
  }

  getNewsItem(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/item/${itemId}.json`);
  }

  getNewsItemComments(commentId: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/item/${commentId}.json`);
  }

  getNestedComments(commentIds: number[]): Observable<any>[] {
    return commentIds.map((commentId) => {
      return this.getNewsItemComments(commentId).pipe(
        switchMap((comment) => {
          if (comment && comment.kids) {
            return forkJoin(this.getNestedComments(comment.kids)).pipe(
              map((nestedComments) => {
                comment.nestedComments = nestedComments;
                return comment;
              })
            );
          } else {
            return of(comment);
          }
        })
      );
    });
  }
}
