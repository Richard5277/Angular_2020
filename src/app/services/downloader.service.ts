import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  constructor(private http: HttpClient){}

  getTextFile(filename: string) {
    return this.http.get(
      filename, { responseType: 'text'}
    ).pipe(
      // tap
      // => let the code inspect both success and error values passing through the observable
      //    without disturbing them
      tap({
        next: data => { console.log(filename, data); },
        error: err => { console.error(filename, err); },
      })
    );
  }

}
