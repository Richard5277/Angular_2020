import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Subject, throwError } from 'rxjs';

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
      .subscribe(posts => this.posts.next(posts), error => this.error.next(error));
  }

  sendPost(postData: Post) {
    this.http
      .post(
        'https://angular-demo-bd2d6.firebaseio.com/posts.json',
        postData
      ).subscribe(() => this.fetchPosts());
  }

  clearPosts() {
    return this.http.delete('https://angular-demo-bd2d6.firebaseio.com/posts.json');
  }

}
