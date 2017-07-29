import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { Asistencias } from '../asistencias/asistencias';
import { AlertController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
/**
 * Generated class for the MostrarAsistencia page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mostrar-asistencia',
  templateUrl: 'mostrar-asistencia.html',
  providers: [ Vibration ]
})
export class MostrarAsistencia {

  mes;
  dia;
  anio;
  arrayAnios : Array<number>=[];
  today = new Date();
  fecha;
  comisiones = [];
  comisionSeleccionada = false;
  filtro = 'filtroGeneral';
  alumnos : Array<alumno> = [];
  cantidadAlumnos = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ARP:ApiRestProvider,
              public vibration : Vibration,
              public alertCtrl: AlertController) {
    this.mes = this.today.getUTCMonth()+1;
    this.dia =  this.today.getDate();
    this.anio = this.today.getFullYear();
    this.fecha= this.today.getDate()+'/'+(this.today.getUTCMonth()+1)+'/'+this.today.getFullYear();
    
    for(var añoActual = this.anio;añoActual >= 2015;añoActual--){
      this.arrayAnios.push(añoActual); //para usar cuando puede cargar el template
    }
    console.log("array" , this.arrayAnios);

    this.ARP.traerTodasLasComisiones().subscribe(item=>{
      this.comisiones = item;
      console.log(item);
    });    
  }

  buscarAlumnos(idComision){
    var fechas = this.dia  + '/' + this.mes + '/' + this.anio;
    var dato={"comision":idComision,"fecha":fechas};  
    console.log(dato);
    this.ARP.traerAsistenciasporComisionyFecha(dato).subscribe(item=>{
      console.log(item);
      this.alumnos = item;
      this.cantidadAlumnos = item.length;
      //this.alumnos.push(new alumno("pedro","maria",this.dia + "/" + this.mes + "/" + this.anio , "Presente",100));
      //this.alumnos.push(new alumno("zuares","zaza",this.dia + "/" + this.mes + "/" + this.anio , "Ausente",200));
      this.cantidadAlumnos = this.alumnos.length;
      if(this.cantidadAlumnos == 0)
      {
        this.showAlert("Comision");        
      }
      else{
        this.filtro = "false";
      }

    });
  }

  VOLVER(){
    this.cantidadAlumnos = 0;
    this.filtro = "filtroGeneral";
  }

  color(estado)
  {
    console.log("entre color", estado);
    if(estado == "Presente")
    {
      return 'green';
    }
    else if(estado == "Ausente")
    {
      return 'red';
    }
  }

  showAlert(criterioBusqueda) {
    this.vibration.vibrate(400);
    let alert = this.alertCtrl.create({
      title: 'BUSQUEDA VACIA',
      subTitle: 'Tu busqueda para ' + criterioBusqueda + " a resultado vacia",
      buttons: ['OK']
    });
    alert.present();
  }

  irAAsistencia()
  {
    this.navCtrl.setRoot(Asistencias);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MostrarAsistencia');
  }

  

}

class alumno {
    apellido: string;
    nombre: string;
    fecha : string;
    estado : string;
    legajo : number;
    constructor(apellido,nombre,fecha,estado,legajo) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.fecha = fecha;
        this.estado = estado;
        this.legajo = legajo;
    }    
}