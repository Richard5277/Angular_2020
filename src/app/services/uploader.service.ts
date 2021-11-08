import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize, last, map, tap } from 'rxjs/operators';
import { MessageService } from './messenger.service';

@Injectable()
export class UploaderService {

  constructor(
    private http: HttpClient,
    private messenger: MessageService
  ){}

  upload(file: File) {

    const req = new HttpRequest('POST', '/upload/file', {
      reportProgerss: true
    });

    return this.http.request(req).pipe(
      finalize(() => console.log('👽 👽 👽 finalize')),
      map(event => this.getEventMessage(event, file)),
      tap(message => this.showProgress(message)), // tap will capture the message from the event
      last(), // return last (completed) message to caller : the last one sent out is HttpResponse, and 'observer.complete()'
      // catchError(error => this.handleError(file, error))
      catchError(this.handleError(file))
    );
  }

  getEventMessage(event: HttpEvent<any>, file: File): string {
    switch (event.type) {
      case HttpEventType.Sent:
        // this.uploadLog = `Uploading file "${file.name}" of size ${file.size}.`;
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        // compute and show the % done
        const percentDone = Math.round(100 * event.loaded / (event.total ?? 0));
        // this.uploadLog = `File "${file.name}" is ${percentDone}% uploaded.`
        return `File "${file.name}" is ${percentDone}% uploaded.`;
      case HttpEventType.Response:
        // this.uploadLog = `File "${file.name}" was completely uploaded!`
        return `File "${file.name}" was completely uploaded!`;
      default:
        // this.uploadLog = `File "${file.name}" surprising upload event: ${event.type}.`
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  showProgress(message: string) {
    this.messenger.add(message);
  }

  handleError(file: File){
    const userMessage = `${file.name} upload failed`;

    return (error: HttpErrorResponse) => {
      // TODO : send error to remote logging infrastructure
      console.error(error);
      const message = (error.error instanceof Error) ?
        error.error.message :
        `Server retured code ${error.status} with body : ${error.error}`;
      this.messenger.add(`${userMessage} ${message}`);

      return of(userMessage);
    };
  }

}
