import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { Vibration } from '@ionic-native/vibration';


@IonicPage()
@Component({
  selector: 'page-profesor-vistaasistencias',
  templateUrl: 'profesor-vistaasistencias.html',
})
export class ProfesorVistaasistencias {

  public id_profesor;
  public comisiones;
  public mostrar:boolean=true;
  public asistencias;
  public nombreMateria;

  constructor(public navCtrl: NavController, public navParams: NavParams,public vibration : Vibration,
              public alertCtrl: AlertController, public ARP:ApiRestProvider) {
                this.traerDatosdelProfesor();  
  }

  traerDatosdelProfesor(){
    this.ARP.decodeToken().subscribe(datos=>{
          this.id_profesor=datos.tokenDecode.id_especifico[0].id_profesor;
          this.ARP.traerComisionPorProfesor(this.id_profesor).subscribe(datos=>{this.comisiones=datos});
      });
  }

  filtrarPor(comision,materiaSelec){
   this.ARP.traerAsistenciasporComision({c:comision})
            .subscribe(datos=>{
                  console.log(datos);
                  this.asistencias = datos;
                  this.mostrar = false;
                  this.nombreMateria=materiaSelec;
                  if(this.asistencias.length == 0)
                  {
                    this.mostrar=true;
                    this.vibration.vibrate(550);
                    let alert = this.alertCtrl.create({
                        title: 'BUSQUEDA VACIA',
                        subTitle: 'Aun NO tomaron nunca asistencia en esa comision',
                        buttons: ['OK']});
                        alert.present();
                  }   
            });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesorVistaasistencias');
  }

}
