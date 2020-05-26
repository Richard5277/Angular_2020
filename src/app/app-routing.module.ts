import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostDetailResolver } from './shared/services/post-detail-resolver.service';
import { PostNoselectComponent } from './posts/post-noselect/post-noselect.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { InterviewComponent } from './interview/interview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent, children: [
      {
        path: '', pathMatch: 'full', component: PostNoselectComponent
      },
      {
        path: 'detail/:id', component: PostDetailComponent, resolve: { post: PostDetailResolver}
      }
    ]
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  { path: 'life-cycle', component: LifeCycleComponent},
  { path: 'interview', component: InterviewComponent},
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
