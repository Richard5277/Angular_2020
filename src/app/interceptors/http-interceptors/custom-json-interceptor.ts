import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class JsonParser {
  // this is custom abstract function
  // so this actually seperte form the system one ???
  abstract parse(text: string): any;
}

@Injectable()
export class CustomJsonParser implements JsonParser {
  parse(text: string): any {
    // custom json parser, adding date retriver
    console.log('when does this happen ???');
    console.log('this is the custom parser ???? 🐶🐶🐶 ', text);
    return JSON.parse(text, dateRetriver);
  }
}

function dateRetriver(key: string, value: any) {
  /*  ... I can add something here?  */
  console.log('key 👀 : ', key);
  console.log('value 👀 : ', value);
  console.log('type of value 👀 : ', typeof value);

  return typeof value === 'string' ?  '✅ richy ✅ ' + value : value;
}

@Injectable()
export class CustomJsonInterceptor implements HttpInterceptor {
  constructor(private jsonParser: JsonParser){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('👽 req.responseType :: ', req.responseType);
    if (req.responseType === 'json') {
      // if responseType is 'json' => use my own method
      // force conver the json to text
      return this.handleJsonResponse(req, next);
    } else {
      return next.handle(req);
    }
  }

  private handleJsonResponse(httpReq: HttpRequest<any>, next: HttpHandler) {
    // same req & next pass in
    // clone the immutable req first, with modifying the responseType to 'text'
    httpReq = httpReq.clone({ responseType: 'text' });

    // then pass to next handler
    // pipe the event
    // map => custom parse Json Response function to modify event
    return next.handle(httpReq).pipe(
      map( event => this.parseJsonResponse(event))
    );
  }

  // only pass in the HttpEvent for the Json parser
  private parseJsonResponse(event: HttpEvent<any>) {
    // use custom Json parser to modify the event
    if (event instanceof HttpResponse && typeof event.body === 'string') {
      console.log('so whats the event now ? ? ? => ', event);
      return event.clone({
        body: this.jsonParser.parse(event.body)
      });
    } else {
      return event;
    }
  }

}
