import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { RequestCache } from '../../services/request-cache.service';

export const searchUrl = '/packages/query';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    // continue if not cacheable
    if ( !isCacheable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);

    // cache-then-refresh
    if (req.headers.get('x-refresh')) {
      // cache first , through setRequest, returns an observable of event, this is the result from last searchRequest
      // then gose back to the previous check, if there's a cached value

      /*
          if yes, then use the cachedResponse, from the result
          -------
          the code pipes the cached resopnse onto results$,
          producing a recomposed observable that emits twice
          the cached response first(and immediately)
          followed later by the response from the server
          subscribers see a sequence of two responses
      */

      // if no, return the results$, which is the result of the sendRequest
      const results$ = sendRequest(req, next, this.cache);
      // #MARK: need to fully understan the 'pipe' and 'startWith(deprecated, use scheduled)'
      return cachedResponse ? results$.pipe( startWith(cachedResponse) ) : results$;
    }

    // cache or fetch
    // #MARK : of is deprecated, use 'scheduled'

    return cachedResponse ? of(cachedResponse) : sendRequest(req, next, this.cache);
  }
}

function isCacheable(req: HttpRequest<any>) {
  // only GET requests are cacheable
  return req.method === 'GET' &&
    -1 < req.url.indexOf(searchUrl);
    // only npm package search is cacheable in this app
    // right, since I dont have a real network request from server
    // only have a local json file
    // #MARK : maybe I can test with my nodejs / javaspring boot
}

function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCache
): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    tap(event => {
      // there may be other events besidse he response
      if (event instanceof HttpResponse) {
        cache.put(req, event); // update the cache
      // tap allows the interceptor cache the necessary response, without desterbing the origional request/response
      // the origional req stil go through => next.handle(req)
      // it just pipe it and tap it
      // services are not aware of this cache
      }
    })
  );
}
