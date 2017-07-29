import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Graficos } from '../graficos/graficos';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
  providers: [ Vibration ]
})
export class Encuesta {

  public pregunta1;
  public pregunta2;
  public pregunta3;
  public Preg1Rb;
  public Preg2Rb;
  public Preg3Rb;
  public preg;
  public respuesta;
  fireDB : FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, 
  public alertCtrl: AlertController, public af: AngularFireDatabase,public vibration : Vibration,private nativeAudio: NativeAudio) {

    this.pregunta1 = "Como calificarias a esta Aplicacion?";
    this.pregunta2 = "Te gusta la interfaz de la Aplicacion?";
    this.pregunta3 = "Recomendarias esta App a otras personas?";

    this.fireDB = af.list('/encuesta');
    this.nativeAudio.preloadSimple('Okay', 'assets/sonidos/ok.mp3');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Encuesta');
  }

  subirEncuesta(){

     let respuestas={pregunta1:"pregunta1",respuesta1:this.Preg1Rb,
                     pregunta2:"pregunta2",respuesta2:this.Preg2Rb,
                     pregunta3:"pregunta3",respuesta3:this.Preg3Rb};

      this.fireDB.push(respuestas);     
      this.nativeAudio.play('Okay', () => console.log('Okay is done playing'));
      this.vibration.vibrate(550);               
      let alert = this.alertCtrl.create({
          title: 'Gracias!',
          subTitle: 'Tus respuestas han sido procesadas.',
          buttons: ['OK']
        });
    alert.present();

    this.navCtrl.setRoot(Graficos);
   }



}


