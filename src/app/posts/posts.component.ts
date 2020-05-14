import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/shared/models/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit, OnDestroy {

  isFetchingPosts = false;
  loadedPosts: Post[] = [];
  error = '';
  private errorSub: Subscription;

  constructor( private postsService: PostService) { }

  ngOnInit(): void {
    this.errorSub = this.postsService.error.subscribe(error => {
      this.isFetchingPosts = false;
      this.error = error.error.error as string;
    });
    this.onFetchPosts();
    this.postsService.posts.subscribe(posts => {
      this.loadedPosts = posts;
    });
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: {title: string, content: string}) {
    const newPost: Post = {title: postData.title, content: postData.content};
    this.postsService.sendPost(newPost);
  }
  onFetchPosts() {
    this.isFetchingPosts = true;
    this.postsService.fetchPosts();
    this.postsService.posts.subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetchingPosts = false;
    });
  }
  onClearPosts() {
    this.postsService.clearPosts().subscribe(() => this.loadedPosts = []);
  }

  onHandleError() {
    this.error = null;
  }

}
