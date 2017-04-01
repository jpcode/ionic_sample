import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import {HomeService} from './home.service';
import { LoginPage } from '../login/login';
import {App} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit {
  nombre : string;
  app : App;
  constructor(public navCtrl: NavController, 
  			  private homeService : HomeService,
  			  private auth : Auth,
          app : App
  			 ) {
  	this.homeService = homeService;
  	this.auth = auth;
    this.app = app;
  }

  logout(){
  	this.auth.logout();
  	this.app.getRootNav().setRoot(LoginPage);
  }

  ngOnInit() {
     this.homeService.getQuestions().subscribe(function( resp ){
     		console.log( resp );
     })
  }
}
