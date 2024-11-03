import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { apiUrl } from '../../utils/apiUrl';
import {  UserResponse, UserData } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private myApi = `${apiUrl}`;
  private userCache: { [page: number]: UserResponse } = {};

  constructor(private _httpClient: HttpClient) {}

  getUsers(page: number): Observable<UserData> {
    if (this.userCache[page]) {
      return of({
        users: this.userCache[page].data,
        totalPages: this.userCache[page].total_pages,
      });
    }
           

    return this._httpClient.get<UserResponse>(`${this.myApi}/users?page=${page}`).pipe(
      tap(response => {
        this.userCache[page] = response;
      }),
      map(response => ({
        users: response.data,
        totalPages: response.total_pages,
      })), // Map to UserData type
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to fetch users'));
      })
    );
  }
}
