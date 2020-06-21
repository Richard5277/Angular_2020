import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = 0;

const _counterReducer = createReducer(initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, state => initialState),
);

export function counterReducer(state, action)  {
  console.log(state, ' - ', action);
  switch (action.type) {
    // ...

  }
  return _counterReducer(state, action);
}
