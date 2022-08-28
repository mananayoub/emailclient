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

interface SigninResponse {
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null as any);
  username!: string;

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<usernameAvailableResponse>(this.rootUrl + '/auth/username', { username });
  } 

  signup(credentials: any) { 
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup', credentials).pipe(
      tap (({username}) => {
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(this.rootUrl + '/auth/signedin')
    .pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
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
    return this.http.post<SigninResponse>(this.rootUrl + '/auth/signin', credentials).pipe(
      tap(({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }
}
