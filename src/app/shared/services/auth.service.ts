import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { Config, AuthURLs } from '../models/config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { User, IUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()//{
      // we declare that this service should be created
      // by the root application injector.
//       providedIn: 'root',
// })
export class AuthService{
      
      private url: string;

      constructor(private http: HttpClient, private jwtHelper: JwtHelperService){
            this.url = Config.authUrl;
      }

      setToken(token: string) : boolean{
            if(!this.jwtHelper.isTokenExpired(token)){
                  localStorage.setItem('access_token', token);
                  return true;
            }
            return false;
      }

      getTokenData(){
            let token : string = localStorage.getItem('access_token');

            if(this.jwtHelper.isTokenExpired(token)){
                  localStorage.removeItem('access_token');
                  return null;
            }
            return this.jwtHelper.decodeToken(token);
      }

      signUp(name: string, surname: string, email: string, company: string, language: string, password: string){

            let params = {'name': name, 'surname': surname, 'email': email, 'company': company, 'password': password, 'language': language};

            return this.http.post(this.url + AuthURLs.SignUp, params)
      }

      logIn(email: string, password: string){
            let params = {'email': email, 'password': password};
            
            return this.http.post<response>(this.url + AuthURLs.LogIn, params)
      }

      logOut(id: number){
            let params = {'id': id};

            return this.http.post(this.url + AuthURLs.LogOut, params);
      }

      verifyEmail(token: string){
            return this.http.get(this.url + AuthURLs.VerifyEmail + "?code=" + token);
      }

      requestResetPassword(fullname: string, email: string){
            let params = {'fullname': fullname, 'email': email};

            return this.http.post(this.url + AuthURLs.PasswordResetRequest, params);
      }

      setResetPassword(token: string, password: string){
            let params = {'token': token, 'password': password};
            
            return this.http.post(this.url + AuthURLs.PasswordReset, params);
      }

}

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

    canLoad() {
    if (!this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'))) {
      return true;
    }

    this.router.navigateByUrl('http://localhost:4200/auth/log-in');
    return false;
  }
}

export class response{
      constructor(
          public token: string,
          public user: JSON
      ){}
}