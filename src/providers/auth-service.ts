import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
  data: any;
  constructor( obj ) {
    this.data = obj;
  }
}

@Injectable()
export class AuthService {
  userLogged : User;

  constructor(private http: Http) {
    console.log('Hello AuthService Provider');
  }

  public login( user, pass ) {

  		let auth = JSON.stringify({
            username: user,
            password: pass
        });
  		let url = "http://private-c213ab-assistme.apiary-mock.com/login";
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post( url , auth, {
					            headers: headers
					        })
        					.map(res => {
        						var resp = res.json();
        						this.userLogged = new User( resp );
        						return resp;
        					});
  }

  public getUser() : any {
    return this.userLogged.data;
  }

}
