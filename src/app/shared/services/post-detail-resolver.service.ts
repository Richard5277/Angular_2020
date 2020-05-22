import { Injectable } from '@angular/core';
import { PostResolved } from '../models/post.model';
import { PostService } from './post.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostDetailResolver implements Resolve<PostResolved> {
  constructor(private postService: PostService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostResolved> | Promise<PostResolved> | PostResolved {
    return this.postService.fetchSinglePost(+route.params.id).pipe(
      map(post => ({ post, error: null})),
      catchError(err => {
        this.router.navigate(['posts']);
        return of({ post: null, error: err });
      }),
    );
  }

}
