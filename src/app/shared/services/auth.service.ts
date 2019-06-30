import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanLoad } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthURLs } from '../models/config';
import { environment } from 'src/environments/environment';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';

@Injectable()// {
      // we declare that this service should be created
      // by the root application injector.
//       providedIn: 'root',
// })
export class AuthService {

      constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
      }

      setToken(token: string): boolean {
            if (!this.jwtHelper.isTokenExpired(token)) {
                  localStorage.setItem('access_token', token);
                  return true;
            }
            return false;
      }

      getTokenData() {
            const token: string = localStorage.getItem('access_token');

            if (this.jwtHelper.isTokenExpired(token)) {
                  localStorage.removeItem('access_token');
                  return null;
            }
            return this.jwtHelper.decodeToken(token);
      }

      signUp(name: string, surname: string, email: string, company: string, language: string, password: string) {
            const params = {'name': name, 'surname': surname, 'email': email, 'company': company, 'password': password, 'language': language};

            return this.http.post(environment.server.url + AuthURLs.base + AuthURLs.signUp, params);
      }

      logIn(email: string, password: string): Observable<{token: string, user: JSON}> {
            const params = {'email': email, 'password': password};

            return this.http.post<{token: string, user: JSON}>(environment.server.url + AuthURLs.base + AuthURLs.logIn, params);
      }

      logOut(id: number) {
            const params = {'id': id};

            return this.http.post(environment.server.url + AuthURLs.base + AuthURLs.logOut, params);
      }

      verifyEmail(token: string) {
            return this.http.get(environment.server.url + AuthURLs.base + AuthURLs.verifyEmail + '?code=' + token);
      }

      requestResetPassword(fullname: string, email: string) {
            const params = {'fullname': fullname, 'email': email};

            return this.http.post(environment.server.url + AuthURLs.base + AuthURLs.passwordResetRequest, params);
      }

      setResetPassword(token: string, password: string) {
            const params = {'token': token, 'password': password};

            return this.http.post(environment.server.url + AuthURLs.base + AuthURLs.passwordReset, params);
      }

}

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private jwtHelper: JwtHelperService, private socketService: SocketService) { }

    canLoad() {
    if (!this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'))) {
            this.socketService.reConnect();
            return true;
    }

    localStorage.removeItem('access_token');

    this.router.navigateByUrl(environment.url + '/auth/log-in');
    return false;
  }
}

export class response {
      constructor(
          public token: string,
          public user: JSON
      ) {}
}
