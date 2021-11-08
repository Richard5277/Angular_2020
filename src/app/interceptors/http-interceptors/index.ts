import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomJsonInterceptor, CustomJsonParser, JsonParser } from './custom-json-interceptor';
import { NoopInterceptor } from './noop-interceptor';
import { UploadInterceptor } from './upload-interceptor';

export const httpIntereptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomJsonInterceptor,
    multi: true
  },
  {
    provide: JsonParser,
    useClass: CustomJsonParser
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NoopInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UploadInterceptor,
    multi: true
  }
];

// the last interceptor in the process is alwasy the
// HttpBackend that handles communication with the server

// !!! HttpResponse & HttpRequest are readonly
// rendering them largely immutable
// benefit : retry with only the origional req
// => ensures that interceptors see the same request for each try

