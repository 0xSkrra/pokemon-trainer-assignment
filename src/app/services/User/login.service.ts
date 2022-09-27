import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user/user.model';

const { apiUsers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Dependency injection
  constructor(private readonly http: HttpClient) { }

  public login(username: string): Observable<User> {
    return this.checkUsername(username)
      .pipe(
        switchMap((user: User | undefined) => {
          // Create new user if it doesn't exist
          if(typeof user === 'undefined') {
            return this.createUser(username);
          }
          return of(user);
        })
      )
  }

  // Check if user exists
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`)
      .pipe(
        // RxJS Operators 
        map((response: User[]) => response.pop())   
      )
  }

  // Create a User
  private createUser(username: string) : Observable<User> {

    const user = {
      username,
      Pokemon: [],
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    return this.http.post<User>(apiUsers, user, {
      headers
    })
  }
}
