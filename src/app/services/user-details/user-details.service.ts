import { Injectable } from '@angular/core';
import { apiUrl } from '../../utils/apiUrl';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
 
export class UserDetailsService {
  private myApi = `${apiUrl}`;
 
  constructor(private _httpClient: HttpClient) {}

  getUserDetails(id: number): Observable<User> {
    return this._httpClient.get<{ data: User }>(`${this.myApi}/users/${id}`).pipe(
      map(response => response.data),  
      catchError(error => {
        console.error('Error fetching this user:', error);
        return throwError(() => new Error('Failed to fetch user details'));
      })
    );
  }
}