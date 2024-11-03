import { Routes } from '@angular/router';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { Err404Component } from './pages/err404/err404.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
 
  { path: '', component: UsersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailsComponent },

  {
    path: '**',
    component: Err404Component,
  },
];
