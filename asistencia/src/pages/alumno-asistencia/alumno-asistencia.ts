import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { Vibration } from '@ionic-native/vibration';

export class Usuario{

    public legajo;
    public nombre;
    public apellido;    
    public calle;
    public altura;
    public email;
    public tipo;

    constructor(datos){
      if(datos!=null){
        this.legajo=datos.legajo;
        this.nombre=datos.nombre;
        this.apellido=datos.apellido;      
        this.calle=datos.calle;
        this.altura=datos.altura;
        this.email=datos.email;
        this.tipo=datos.tipo;
      }
      else{
         this.legajo='';
         this.nombre='';
         this.apellido='';      
         this.calle='';
         this.altura='';
        this.email='';
         this.tipo='';
      }
    }
}



@IonicPage()
@Component({
  selector: 'page-alumno-asistencia',
  templateUrl: 'alumno-asistencia.html',
})
export class AlumnoAsistencia {

  public usuario:Usuario=new Usuario(null);
  public id_alumno;
  public comisiones;
  public mostrar:boolean=true;
  public asistencias;
  public nombreMateria="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public vibration : Vibration,
              public alertCtrl: AlertController, public ARP:ApiRestProvider) {
      this.traerDatosdelAlumno();      
  }

  traerDatosdelAlumno(){
    this.ARP.decodeToken().subscribe(datos=>{
          this.id_alumno=datos.tokenDecode.id_especifico;
          this.ARP.traerComisionesdelAlumno(this.id_alumno).subscribe(datos=>{this.comisiones=datos});
      });
  }


  filtrarPor(comision,materiaSelec){
    this.ARP.traerAsistenciasporComisionyAlumno({c:comision,id:this.id_alumno})
            .subscribe(datos=>{

                  this.asistencias = datos;
                  this.mostrar = false;
                  this.nombreMateria=materiaSelec;
                  if(this.asistencias.length == 0)
                  {
                    this.mostrar=true;
                    this.vibration.vibrate(550);
                    let alert = this.alertCtrl.create({
                        title: 'BUSQUEDA VACIA',
                        subTitle: 'Aun NO te tomaron nunca asistencia en esa materia',
                        buttons: ['OK']});
                        alert.present();
                  }   
            });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnoAsistencia');
  }

}
