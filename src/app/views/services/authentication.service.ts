import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';

export class User {
  constructor(public status: string) {}
}

export class JwtResponse {
  constructor(public jwttoken: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  baseUrls = environment.baseUrl + '/authenticate';
  public currentUser: Observable<string>;

  constructor(private httpClient: HttpClient) {}

  //  authenticate(username, password) {
  //    console.log('in authentication ');
  //   return this.httpClient.post<any>(this.baseUrls,{username,password}).pipe(
  //    map(
  //      userData => {
  //       console.log('fff')
  //       sessionStorage.setItem('username',username);
  //       let tokenStr= 'Bearer '+userData.token;
  //       sessionStorage.setItem('token', tokenStr);

  //       return userData;
  //      }
  //    )

  //   );
  // }

  authenticate(username: string, password: string) {
    let token = '3qlkj423lk54jl3245j';

    // const data = {"token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdmlzaGthciIsImV4cCI6MTY0MDc4ODM5OCwiaWF0IjoxNjQwNzcwMzk4fQ.-94T0_vK-G-2HuouSH_j-Um22hjh7ki4QFhJUqf3pGjmAMsH9hbi6djR7s6TqwoPT7gHEd-oAzF3JOILfR5NTw"};

    //       let tokenStr= 'Bearer ' + data.token;
    //       sessionStorage.setItem('token', tokenStr);
    //       sessionStorage.setItem('username', username);
    //     return true;

    return this.httpClient
      .post<any>(this.baseUrls, { username, password, token })
      .pipe(
        map((data) => {
          console.log('response of login is -> ', data);

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (data.token != undefined && data.token != null) {
            let tokenStr = 'Bearer ' + data.token;
            sessionStorage.setItem('token', tokenStr);
            sessionStorage.setItem('username', username);

            console.log('data in login service ', data);
            return data;
          } else {
            console.log('data in login exception service ', data);
            // catchError(this.errorHandl)
            return data;
          }
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('token');
    //console.log(!(user === null))
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}
