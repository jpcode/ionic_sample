import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from '../../providers/auth';
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

  authType: string = "login";

  loading: Loading;
  user = {codigo: '', password: ''};

  constructor(	public navCtrl: NavController, 
  				private alertCtrl: AlertController, 
  				private loadingCtrl: LoadingController, 
  				private auth: Auth, 
  				public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.showLoading();
    var user = this.user;
    this.auth.login( "coco@fitco.com.pe", "123" ).subscribe( success  => {
      if ( success ){
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
      }else{
          this.showError("Ups! Al parecer escribiste mal tu codigo");
      }  
    },
    error => {
      this.showError(error);
    });
   
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Un momento...'
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
