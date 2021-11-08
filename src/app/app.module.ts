// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeModule } from './employee/employee.module';

// components
// using aliases for import statements
import { CardModule } from '@components/card/card.module';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';

// pages
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
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

// services
import { AuthInterceptorService } from './shared/services/interceptors/auth-interceptor';
import { LoggingInterceptorService } from './shared/services/interceptors/logging-interceptor';
import { PostDetailResolver } from './shared/services/post-detail-resolver.service';

// ngrx
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrx/counter.reducer';
import { testCounterReducer } from './ngrx/testCounter.reducer';

import { MyCounterComponent } from './ngrx/my-counter/my-counter.component';
import { NgrxPageComponent } from './ngrx-page/ngrx-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfigComponent } from '@components/config/config.component';
import { ConfigModule } from '@components/config/config.module';
import { NoopInterceptor } from './interceptors/http-interceptors/noop-interceptor';
import { httpIntereptorProviders } from './interceptors/http-interceptors';
import { UploaderComponent } from '@components/uploader/uploader.component';
import { UploadInterceptor } from './interceptors/http-interceptors/upload-interceptor';
import { UploaderService } from '@services/uploader.service';
import { MessagesComponent } from '@components/messages/messages.component';

// import { NgProgressHttpModule } from 'ngx-progressbar/http';

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
    NgrxPageComponent,
    MyCounterComponent,
    UploaderComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    ConfigModule,
    EmployeeModule,
    StoreModule.forRoot(rootReducer),
    // NgProgressModule.withConfig({
    //   color: 'yellow',
    // }),
    // NgProgressHttpModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  // orders of interceptors will change the output
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: NoopInterceptor,
    //   multi: true
    // },
    // httpIntereptorProviders,
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
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: UploadInterceptor,
    //   multi: true,
    //   // deps: [UploaderService]
    // },
    PostDetailResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
