import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserDetailsService } from '../../services/user-details/user-details.service';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private _userDetails: UserDetailsService) {}

  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.searchUsers),
      mergeMap(action => {
        const userId = Number(action.query); // Convert string to number
        return this._userDetails.getUserDetails(userId).pipe(
          map((user: User) => {
            return UsersActions.searchUsersSuccess({ users: [user] });
          }),
          catchError(error => of(UsersActions.searchUsersFailure({ error })))
        );
      })
    )
  );
}
