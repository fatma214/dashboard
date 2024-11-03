import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from '../../interfaces/user.interface';
 

export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.searchUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.searchUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users
  })),
  on(UsersActions.searchUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
