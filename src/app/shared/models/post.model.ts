export interface Post {
  title: string;
  content: string;
  id?: string;
  language?: string;
}

export interface PostResolved {
  post: Post;
  error?: any;
}
