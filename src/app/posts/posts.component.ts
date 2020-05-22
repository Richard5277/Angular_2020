import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/shared/models/post.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit, OnDestroy {

  isFetchingPosts = false;
  loadedPosts: Post[] = [];
  error = '';

  items = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'Node Js'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'PHP'},
    {id: 5, name: 'Django'},
    {id: 6, name: 'Angular'},
    {id: 7, name: 'Vue'},
    {id: 8, name: 'ReactJs'},
  ];
  selectedLanguage: string;

  @ViewChild('postForm') postForm: NgForm;

  private errorSub: Subscription;

  constructor(private postsService: PostService, private router: Router, private route: ActivatedRoute) { }

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
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: { title: string, content: string, language?: string }) {
    const newPost: Post = { title: postData.title, content: postData.content, language: postData.language };
    this.postsService.sendPost(newPost);
    this.postForm.reset();
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

  onHandleNavPostDetail(index: string) {
    this.router.navigate(['detail', index], { relativeTo: this.route });
  }

}
