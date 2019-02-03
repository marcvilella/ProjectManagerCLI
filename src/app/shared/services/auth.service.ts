import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, CanLoad } from '@angular/router';
import { map } from 'rxjs/operators';
import { Config, AuthURLs } from './config.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()//{
      // we declare that this service should be created
      // by the root application injector.
//       providedIn: 'root',
// })
export class AuthService{
      
      private url: string;
      private ip: string;

      constructor(private _http: Http, private jwtHelper: JwtHelperService){
            this.url = Config.url;
            this.ip = Config.ip;
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
            let headers = new Headers({'Content-Type':'application/json'});

            return this._http.post(this.url + AuthURLs.SignUp, params, {headers: headers})
                  .pipe(map(res => res.json()));
      }

      logIn(email: string, password: string){
            let params = {'email': email, 'password': password};
            let headers = new Headers({'Content-Type':'application/json'});

            return this._http.post(this.url + AuthURLs.LogIn, params, {headers: headers})
                  .pipe(map(res => res.json()));
      }

      verifyEmail(token: string){

            let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
            let options = new RequestOptions({headers: headers});

            let a = this._http.get(this.url + AuthURLs.VerifyEmail + "?code=" + token, {headers: headers})
                        .pipe(map(res => res.json()));
            return a;
      }

      requestResetPassword(fullname: string, email: string){
            let params = {'fullname': fullname, 'email': email};
            let headers = new Headers({'Content-Type':'application/json'});

            return this._http.post(this.url + AuthURLs.PasswordResetRequest, params, {headers: headers})
                  .pipe(map(res => res.json()));
      }

      setResetPassword(token: string, password: string){
            let params = {'token': token, 'password': password};
            let headers = new Headers({'Content-Type':'application/json'});

            return this._http.post(this.url + AuthURLs.PasswordReset, params, {headers: headers})
                  .pipe(map(res => res.json()));
      }

}

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

    canLoad() {
    if (localStorage.getItem('access_token')) {

      console.log(this.jwtHelper.isTokenExpired(localStorage.getItem('access_token')))
      return true;
    }

    this.router.navigateByUrl('http://localhost:4200/auth/log-in');
    return false;
  }
}