import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import {HomeService} from './home.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit {
  nombre : string;

  constructor(public navCtrl: NavController, 
  			  private homeService : HomeService,
  			  private auth : Auth 
  			 ) {
  	this.homeService = homeService;
  	this.auth = auth;
  }

  logout(){
  	this.auth.logout();
  	this.navCtrl.setRoot(LoginPage);
  }

  ngOnInit() {
     this.homeService.getQuestions().subscribe(function( resp ){
     		console.log( resp );
     })
  }
}
