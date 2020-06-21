import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const ll = createAction('[Counter Component] ll');


// export const loginSuccess = createAction(
//   '[Auth/API] Login Success',
//   props<{ user: User }>()
// );

// export const loginSuccess = createAction(
//   '[Auth/API] Login Success',
//   (response: Response) => response.user
// );
