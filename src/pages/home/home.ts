import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit {
  nombre : string;

  constructor(public navCtrl: NavController, private authService : AuthService ) {}

  ngOnInit() {
     var user = this.authService.getUser();
     this.nombre = user.nombre;
     console.log( 'user: ', user );
  }
}
