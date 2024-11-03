import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
 

 
export const searchUsers = createAction(
  '[Users] Search Users',
  props<{ query: string }>()
);

 
export const searchUsersSuccess = createAction(
  '[Users] Search Users Success',
  props<{ users: User[] }>()
);


export const searchUsersFailure = createAction(
  '[Users] Search Users Failure',
  props<{ error: any }>()
);
