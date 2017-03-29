import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  loading: Loading;
  user = {email: '', password: ''};


  constructor(	public navCtrl: NavController, 
  				private alertCtrl: AlertController, 
  				private loadingCtrl: LoadingController, 
  				private auth: AuthService, 
  				public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.showLoading();
    var user = this.user;
    this.auth.login( user.email, user.password ).subscribe( data  => {
      if ( data ) {
        setTimeout(() => {
        	this.loading.dismiss();
        	this.navCtrl.setRoot(TabsPage)
        });
      } else {
        this.showError("Código o contraseña incorrecto");
      }
    },
    error => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

   showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Ups! error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
