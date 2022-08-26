import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface usernameAvailableResponse {
  available: boolean;
}
// interface SignupCredeantails { //not adding here because getting error from this
//   username: string;
//   password: string;
//   passwordConfirmation: string;
// }
interface SignupResponse {
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<usernameAvailableResponse>(this.rootUrl + '/auth/username', { username });
  } 

  signup(credentials: any) { 
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup', credentials
    ).pipe(
      tap (() => {
        this.signedin$.next(true);
      })
    );
  }
}
