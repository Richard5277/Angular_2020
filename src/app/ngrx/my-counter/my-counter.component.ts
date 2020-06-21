import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';
import { testIncrement, testDecrement, testReset } from '../testCounter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.sass'],
})
export class MyCounterComponent {
  count$: Observable<number>;
  testCount$: Observable<number>;

  constructor(private store: Store<{ count: number, testCount: number }>) {
    this.count$ = store.pipe(select('count'));
    this.testCount$ = store.pipe(select('testCount'));
  }

  increment() {
    this.store.dispatch(increment());
  }
  testIncrement() {
    this.store.dispatch(testIncrement());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
  testDecrement() {
    this.store.dispatch(testDecrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
  testReset() {
    this.store.dispatch(testReset());
  }
}


/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
