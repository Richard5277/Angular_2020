import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/* => hanlde()
   => transforms an HTTP request into an Observable of HttpEvents
   => which ultimately include the server's response

 export abstract class HttpHandler {
  abstract handle(rea: HttpRequest<any>): Observable<HttpEvent<any>>;
 }
*/

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  // intercept method transforms a request into an Observable
  // eventually returns the HTTP response
  // in this sense, each interceptor is fully capable of handling the request entirely by itself

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🦁 noop interceptor');
    // const secureReq = req.clone({ // clone method's hash argument
    //   url: req.url.replace('http://', 'https')
    // });
    // next => final next in the chain is the HttpClient backend handler that
    // => sends the request to the server
    // => and receives the server's response

    /* Modify the req body:
      1. copy the body, and make change in the copy
      2. clone the req body, using its 'clone()' method
      3. replace the clone's body with the modified body
    */

    const newBody = {
      ...req.body,
      // name: req.body.name.trim(),
      url: req.url.replace('http', 'https')
    };
    const newReq = req.clone({ body: newBody });

    return next.handle(newReq);
  }

}

