import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigSerivce } from 'src/app/config/config.service';
import { httpIntereptorProviders } from 'src/app/interceptors/http-interceptors';
import { NoopInterceptor } from 'src/app/interceptors/http-interceptors/noop-interceptor';
import { ConfigComponent } from './config.component';

@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: NoopInterceptor,
    //   multi: true
    // },
    httpIntereptorProviders,
    ConfigSerivce
  ],
  exports: [ConfigComponent]
})
export class ConfigModule { }
