import { createReducer, on } from '@ngrx/store';
import { testIncrement, testDecrement, testReset } from './testCounter.actions';

export const initialState = 10;

const _testCounterReducer = createReducer(initialState,
  on(testIncrement, state => state + 1),
  on(testDecrement, state => state - 1),
  on(testReset, state => initialState),
);

export function testCounterReducer(state, action)  {
  return _testCounterReducer(state, action);
}
