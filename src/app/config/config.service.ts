import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigModule } from '@components/config/config.module';
import { Observable, throwError } from 'rxjs' ;
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

// best practice for creating scalable solutions by defining a re-useable
// => injectalbe service
// to perform the data-handling funtionality
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ConfigSerivce {

  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {}

  getConfig() {
    // returns an observalbe of Config
    // use RxJS map => transform the response data as needed by the UI
    // pass to async pipe

    // return this.http.get<Config>(this.configUrl, { responseType: 'json' });

    return this.http.get<Config>(this.configUrl, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('------- error', error);
    if (error.status === 0) {
      // client-side or network err occurred
      console.error('An error occurred: ', error.error);
    } else {
      // backend returned an unsuccessful resopnse code
      // the response body may contain clues as to what went wrong
      console.error(`Backend returned code ${error.status}, body was : `, error.error);
    }

    // retrun an observable with a user-facing error message
    return throwError('Something bad happened; pleaes try again later.');
  }

}
