import { createAction } from '@ngrx/store';

export const testIncrement = createAction('[TestCounter Component] TestIncrement');
export const testDecrement = createAction('[TestCounter Component] TestDecrement');
export const testReset = createAction('[TestCounter Component] TestReset');
