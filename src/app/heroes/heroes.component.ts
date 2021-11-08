import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from './hero.interface';
import { HeroService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  providers: [HeroService]
})
export class HeroesComponent implements OnInit{

  heroes: Hero[] = [];
  editHero: Hero | undefined;

  constructor(private heroService: HeroService){}

  ngOnInit() {

  }

  add(name: string): void {
    this.editHero = undefined;
    name = name.trim();
    if (!name) {
      return;
    }

    const newHero: Hero = { name } as Hero;
    this.heroService
      .addHero(newHero)
      .subscribe(hero => this.heroes.push(hero));
  }

  delete(id: number): Observable<unknown> {
    this.heroService
      .deleteHero(hero.id)
      .subscribe();
      // not expecting any result - subscribe without a subscribe
      // even tho not using, but still need to subscribe
      // when subscribe, it means 'excute the observable', which is the initial service delete request
      // ALWAYS SUBSCRIBE !!!

      // HttpClient methods does not begin its HTTP request, until subscribe() is getting called on the observable returned by the method
      // TRUE FOR ALL HttpClient Method !!!

      // ===> AsyncPipe (subscribe & unsubscribe)  automatically !!!!!
  }

  update(hero: Hero): Observable<Hero> {
    this.heroService.updateHero(hero).subscribe();
  }

}
