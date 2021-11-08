import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UploadInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (req.url.indexOf('/upload/file') === -1){
      return next.handle(req);
    }

    const delay = 300;
    return createUploadEvents(delay);
  }
}

// create simulation of upload event stream
function createUploadEvents(delay: number){
  // simulate XHR behavior
  // which would provide those information in a ProgressEvent
  const chunks = 5;
  const total = 12345678;
  const chunkSize = Math.ceil(total / chunks);

  return new Observable<HttpEvent<any>>(observer => {
    // notify the event stream that the request was sent
    observer.next({ type: HttpEventType.Sent });

    uploadLoop(0);

    function uploadLoop(loaded: number){
      setTimeout(() => {
        loaded += chunkSize;

        if (loaded >= total) {
          const doneResponse = new HttpResponse({
            status: 201 // ok but no body
          });
          observer.next(doneResponse);
          console.log('🍎 🍎 upload done response sent out');
          observer.complete(); // this is how the service know that the event type is 'Response'

          return;
        }

        const progressEvent: HttpProgressEvent = {
          type: HttpEventType.UploadProgress,
          loaded,
          total
        };
        console.log('🍎 upload in progress');
        observer.next(progressEvent);
        // resursive process, until it meets the 'loaded >= total' condition to break the loop
        uploadLoop(loaded);
      }, delay);
    }
  });
}
