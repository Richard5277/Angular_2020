import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logNormal( log: string , info: any ) {
    console.log(`%c ${log} `, 'color: #FF8360', info);
  }

  logImportant( log: string, info: any ) {
    console.log(`%c ${log} `, 'color: #E57A44', info);
  }

}
