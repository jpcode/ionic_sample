import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';


/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class HomeService {

  constructor( private authHttp: AuthHttp, private http: Http ) {}
  /* Just testing jwt header */
  getQuestions(): Observable<any> {
      return this.authHttp.get("http://polls.apiblueprint.org/questions")
                           .map( (response: Response) => response );
  }

  
}