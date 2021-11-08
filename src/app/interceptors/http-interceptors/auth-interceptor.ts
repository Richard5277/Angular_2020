import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // get the auth token from the service
    const authToken = this.auth.getAuthorizationToken();

    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', authToken)
    // });
    // => common, for shortcut
    const authReq = req.clone({
      setHeaders: {
        Authrization: authToken
      }
    });

    /*
      USE cases :
      * Authentication / authorization
      * Caching behavior eg: 'If-Modified-Since'
      * XSRF protection
    */

    return next.handle(authReq);
  }
}
