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

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}
interface SignupResponse {
  username: string;
}

// interface SigninCredentials {
//   username: string;
//   password: string;
// }
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
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup', credentials).pipe(
      tap (() => {
        this.signedin$.next(true);
      })
    );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(this.rootUrl + '/auth/signedin')
    .pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
      })
    );
  }
  
  signout() {
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: any) {
    return this.http.post(this.rootUrl + '/auth/signin', credentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }
}
