import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from '@services/messenger.service';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private massenger: MessageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const started = Date.now();
    let ok: string;
    return next.handle(req)
      .pipe(
        tap( // capture whether the request successed or failed
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          error => ok = 'failed'
        ),
        finalize(() => { // when the response observable either errors or completes
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          this.massenger.add(msg);
        })
      );
    }
}
