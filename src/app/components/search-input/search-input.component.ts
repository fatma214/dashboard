


import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../store/users/users.actions';
import * as UsersSelectors from '../../store/users/users.selectors';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';
 

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    // Select users, loading state, and errors from the store
    this.users$ = this.store.select(UsersSelectors.selectAllUsers);
    this.loading$ = this.store.select(UsersSelectors.selectUsersLoading);
    this.error$ = this.store.select(UsersSelectors.selectUsersError);
  }

  search(query: string) {
    this.store.dispatch(UsersActions.searchUsers({ query }));
  }
}
