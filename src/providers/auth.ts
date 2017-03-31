import {tokenNotExpired} from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Storage } from '@ionic/storage';
import {JwtHelper} from 'angular2-jwt';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class Auth {

  public token: string;
  storage : Storage;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor( private http: Http, storage: Storage ) {
    
    var currentUser = '';
    this.storage = storage;
    this.storage.ready().then(() => {
       this.storage.get('id_token').then((val) => {
         console.log('Your id_token is: ', val);
         currentUser = val;
       }).catch( error => {
         console.log('error auth: ', error );
       })
     });
    
     this.token = currentUser && currentUser['token'];
  }

  login( email: string, password: string): Observable<boolean> {
        let auth = {
            email: email,
            password: password
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post( '/api/auth', 
                                auth,{
                                  headers: headers
                                })
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    // show jwt object
                    console.log( this.jwtHelper.decodeToken(token) );
                    this.storage.set('id_token', JSON.stringify({ email: email, token: token }));
                    return true;
                }
                return false;
            });
    }

    logout(): void {
        this.token = null;
        this.storage.remove('id_token');
    }

  public authenticated() {
        console.log( 'expired: ', tokenNotExpired() );
        return true
    }

}