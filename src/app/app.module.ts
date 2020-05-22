import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from './components/card/card.module';
import { EmployeeModule } from './employee/employee.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthInterceptorService } from './shared/services/interceptors/auth-interceptor';
import { LoggingInterceptorService } from './shared/services/interceptors/logging-interceptor';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostDetailResolver } from './shared/services/post-detail-resolver.service';
import { PostNoselectComponent } from './posts/post-noselect/post-noselect.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    NavBarComponent,
    PostDetailComponent,
    PostNoselectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    EmployeeModule
  ],
  // orders of interceptors will change the output
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    },
    PostDetailResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
