import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { Vibration } from '@ionic-native/vibration';
/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
  providers: [ Vibration ]
})
export class Registro {

   persona = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public vc:ViewController,
  private alertCtrl: AlertController, public vibration : Vibration) {
        
  }

  registrar(miPersona)
  {
    if(miPersona.nombre != undefined)
    {
      /*try {
          this.af.auth.createUser({email:miPersona.email,password:miPersona.password}).then(
          (usuario) => { //entro al then, ya esta registrado el usuario
              // all good, lets move on
              usuario.auth.updateProfile({displayName: miPersona.nombre,photoURL: ''}); //agrego datos personales a mi persona en el Firebase
              console.log(usuario);
              this.af.auth.logout(); //al crearse se abre la sesion. yo se la cierro        
              this.vc.dismiss(); // cierro el modal
          },
          (err) => {
              // something didn't work
            console.log(err);
            if(err.message == "Password should be at least 6 characters." || err.message == "Password should be at least 6 characters")
                    this.presentAlert("La contraseña debe tener al menos 6 caracteres");
          }
        );
      }//fin try
      catch (error) {
        console.log(error);
        console.log(error.message);
        var mensaje = "";
        if(error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.')    
          mensaje = "El Email debe ser valido";         
        if(error.message == 'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.')
          mensaje = "Falta completar Password";
        
        this.presentAlert(mensaje);
      }//fin catch*/
    }
    else
    {
      this.presentAlert("No puede ser vacio el Nombre");
    }
  }//fin registrar
  

  cancelar()
  {
    this.vc.dismiss(); // cierro el modal
  }

  presentAlert(datoError) {
    this.vibration.vibrate(400);
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: datoError,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro');
  }

}
