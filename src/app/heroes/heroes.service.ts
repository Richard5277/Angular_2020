import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Hero } from './hero.interface';
/*
  POST : add a new hero to the database
*/

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};
// cannot directly modify the existing headers within the previous options object
// as => instances of HttpHeaders class are immutable
// use set() method to return a clone of the current instance

// directly use query string to construct an immutable HttpParams
const params = new HttpParams({ fromString: 'name=foo'});

@Injectable()
export class HeroService {

  heroesUrl = 'api/heroes';

  constructor(private http: HttpClient){}

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(
      this.heroesUrl,
      hero,
      httpOptions
    ).pipe(
      catchError(this.handleError('addHero', hero))
    );
  }

  deleteHero(id: number): Observable<unknown> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('updateHero', hero))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();
    const options = term ? { params: new HttpParams().set('name', term)} : {};

    return this.http.get<Hero[]>(this.heroesUrl, options)
      .pipe(
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }
}
