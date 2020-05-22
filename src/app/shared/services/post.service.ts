import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Subject, throwError } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts = new Subject<Array<Post>>();
  error = new Subject<HttpErrorResponse>();

  constructor( private http: HttpClient){}

  fetchPosts() {
    let searchParams = new HttpParams();
    const queryObj = {
      print: 'pretty',
      event: 'new',
      updated: 'true'
    };
    Object.keys(queryObj).forEach( key => searchParams = searchParams.append(key, queryObj[key]));
    return this.http
      .get<{[key: string]: Post}>('https://angular-demo-bd2d6.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({
            'Custom-Header':  'RICH',
            'Authentication-Method':  'COOKIE',
          }),
          params: searchParams
        }
      )
      .pipe(
        map( responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      }))
      .subscribe(posts => this.posts.next(posts.slice()), error => this.error.next(error));
  }

  fetchSinglePost(index: number) {
    return this.http
      .get<{[key: string]: Post}>('https://angular-demo-bd2d6.firebaseio.com/posts.json')
      .pipe(
        map( responseData => {
          const post = Object.values(responseData)[index];
          return {...post, language: post.language ? post.language : 'ANY'};
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      }));
  }

  sendPost(postData: Post) {
    this.http
      .post(
        'https://angular-demo-bd2d6.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response',
          responseType: 'json'
        }
      ).subscribe(
        responseData => {
          this.fetchPosts();
        },
        error => {
          this.error.next(error);
        }
      );
  }

clearPosts() {
    return this.http.delete(
      'https://angular-demo-bd2d6.firebaseio.com/posts.json',
      {
        observe: 'events'
      }
      ).pipe(
        tap(event => {
          if ( event.type === HttpEventType.Sent) {
            // request sent, waiting for response...
            console.log('request sent, waiting for response...');
          }
          if ( event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }

}
