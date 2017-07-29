import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppState } from '../../app/app.global';

/**
 * Generated class for the Themind page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-themind',
  templateUrl: 'themind.html',
})
export class Themind {

  public GrupoRb;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: AppState) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Themind');
  }


themeElegido(){   

    switch(this.GrupoRb){

      case "Default":
                      this.changeTheme('');
                      break;
      
      case "Dark": 
                     this.changeTheme('theme-dark');                           
                     break;
      
      case "Lady":
                     this.changeTheme('theme-lady');
                     break;
      
      case "Wood": 
                      this.changeTheme('theme-wood');                      
                      break;
      
      case "Stars": 
                      this.changeTheme('theme-stars');
                      break;
      case "Flower": 
                      this.changeTheme('theme-flower');
                      break;
      case "Car": 
                      this.changeTheme('theme-car');
                      break;
      case "Compass": 
                      this.changeTheme('theme-compass');
                      break;                                      
    }
  }

   changeTheme(theme) {
   this.global.set('theme', theme);
 }

}
