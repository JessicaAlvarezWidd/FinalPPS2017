import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Registro } from '../registro/registro';
import { AngularFireAuth } from 'angularfire2/auth';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Menu } from '../menu/menu';
import { Vibration } from '@ionic-native/vibration';

export class User {
  public email: string;
  public password: string;

  constructor()
  {
    this.email = '';
    this.password = '';
  }
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ Vibration ]
})
export class Login {

  //user: Observable<firebase.User>;
  usuario: User = new User();

  constructor(public navCtrl: NavController,
   public navParams: NavParams,public ARP:ApiRestProvider,
   public modalCtroler:ModalController,
   public alertCtrl: AlertController,
   public vibration : Vibration,
   public afAuth: AngularFireAuth) {
     //this.user = afAuth.authState;
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  /*Login(usuario)
  {
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log(this.usuario.MailIngresado);console.log(this.usuario.ClaveIngresa);
    this.afAuth.auth.signInWithEmailAndPassword(this.usuario.MailIngresado,this.usuario.ClaveIngresa).then(
      (result) => {
          // all good, lets move on
          this.navCtrl.setRoot(TabsPage);
          console.log(result);          
          //this.navCtrl.push(Trivia);
      },
      (err) => {
          // something didn't work
        console.log(err);
        alert(err);
      }
    );

    //this.afAuth.auth.
  }*/


  Login()
  {
    this.ARP.crearToken( this.usuario ).subscribe(resp=>{
            if(!resp.exito){
              this.vibration.vibrate(400);
              let alert = this.alertCtrl.create({
                              title: 'Error',
                              subTitle: 'Verifique sus datos',
                              buttons: ['Aceptar']
                            });
                            alert.present();
            }
            else{
              localStorage.setItem('token', resp.tokenGenerado); 
              console.log("ENTRO LOGIN");             
              
              this.navCtrl.setRoot(Menu);

            }
    });
  }  
  abrirRegistro()
  {
    let registro = this.modalCtroler.create(Registro);
    registro.present();
  }

  administrador()
  {
    this.usuario = {email:"malopz@gmail.com",password:"123456"};
  }

  alumno()
  {
    this.usuario = {email:"pam@gmail.com",password:"pame123"};
  }

  profesor()
  {
    this.usuario = {email:"diec@gmail.com",password:"123456"};
  }

  administrativo()
  {
    this.usuario = {email:"aloAza@gmail.com",password:"123456"};    
  }
}
