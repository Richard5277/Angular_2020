import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ErrorPageComponent } from './error-page/error-page.component';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { InterviewComponent } from './interview/interview.component';
import { BasicHightlightDirective } from './shared/directives/basic-hightlight/basic-hightlight.directive';
import { AdvancedHightlightDirective } from './shared/directives/advanced-highlight/advanced-highlight.directive';
import { UnlessDirective } from './shared/directives/unless/unless.directive';
import { TemplateFormComponent } from './form-page/template-form/template-form.component';
import { ReactiveFormComponent } from './form-page/reactive-form/reactive-form.component';
import { AppFormComponent } from './form-page/form-page.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrx/counter.reducer';
import { testCounterReducer } from './ngrx/testCounter.reducer';

import { MyCounterComponent } from './ngrx/my-counter/my-counter.component';
import { NgrxPageComponent } from './ngrx-page/ngrx-page.component';

const rootReducer = {
  count: counterReducer,
  myTestCount: testCounterReducer
};

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    NavBarComponent,
    PostDetailComponent,
    PostNoselectComponent,
    ErrorPageComponent,
    LifeCycleComponent,
    InterviewComponent,
    BasicHightlightDirective,
    AdvancedHightlightDirective,
    UnlessDirective,
    AppFormComponent,
    TemplateFormComponent,
    ReactiveFormComponent,
    MyCounterComponent,
    NgrxPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    EmployeeModule,
    StoreModule.forRoot(rootReducer)
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
