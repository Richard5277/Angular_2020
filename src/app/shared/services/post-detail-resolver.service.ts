import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from './post.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PostDetailResolver implements Resolve<Post> {
  constructor(private postService: PostService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> | Promise<Post> | Post {
    return this.postService.fetchSinglePost(+route.params.id);
  }

}
