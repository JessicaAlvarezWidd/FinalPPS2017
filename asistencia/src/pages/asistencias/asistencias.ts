import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { TabsPage } from '../tabs/tabs';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
/**
 * Generated class for the Asistencias page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-asistencias',
  templateUrl: 'asistencias.html',
  providers: [ Vibration ]
})
export class Asistencias {

  filtro = "filtroBotones";
  today = new Date();
  fecha : string;
  asistenciaPor = "Materia";
  turno = "Turno";
  public mostrar:boolean;
  public alumnos;
  arrayPresentes : Array<any> = [];
  diaSeleccionado = false;
  aulaSeleccionado = false;
  materiaSeleccionado = false;
  comisionSeleccionada = false;
  profesorSeleccionado = false;
  cantidadAlumnos = 0;
  cantidadMaterias = 0;
  cantidadComisiones = 0;
  cantidadProfesores = 0;  
  profesores;
  materias;
  comisiones;  
  arrayAsistencia : Array<asistencia> = [];
  


  restablecerValores()
  {    
    this.filtro = "filtroBotones";
    this.diaSeleccionado = false;
    this.aulaSeleccionado = false;
    this.materiaSeleccionado = false;
    this.comisionSeleccionada = false;
    this.profesorSeleccionado = false;
    this.cantidadMaterias = 0;
    this.cantidadAlumnos = 0;
    this.cantidadComisiones = 0;
    this.cantidadProfesores = 0;
    this.arrayPresentes = [];
    this.arrayAsistencia = [];

  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ARP:ApiRestProvider,
              private nativeAudio: NativeAudio,
              public vibration : Vibration,
              public alertCtrl: AlertController) {
                this.fecha= this.today.getDate()+'/'+(this.today.getUTCMonth()+1)+'/'+this.today.getFullYear();
                this.mostrar=false;
                this.nativeAudio.preloadSimple('Okay', 'assets/sonidos/ok.mp3');
                this.nativeAudio.preloadSimple('Error', 'assets/sonidos/fail.mp3');
              }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Asistencias');
  } 

  ir()
  {
    this.navCtrl.setRoot(TabsPage);
  }

  irAlta()
  {}

  subirAsistencias()
  {
    this.fecha= this.today.getDate()+'/'+(this.today.getUTCMonth()+1)+'/'+this.today.getFullYear();

    for(var i = 0; i < this.alumnos.length;i++)
    {    
      this.arrayAsistencia.push(new asistencia(this.alumnos[i].id_alumno,this.alumnos[i].id_comision,this.fecha,this.arrayPresentes[i]));

    }
    console.log(this.arrayAsistencia);
    
    this.ARP.guardarAsistencias(this.arrayAsistencia).subscribe(respuesta => { 
              console.log(respuesta);
              if(respuesta.exito){

                    this.nativeAudio.play('Okay', () => console.log('Okay is done playing'));
                    this.vibration.vibrate(550);
                    let alert = this.alertCtrl.create({
                                title: 'Exito',
                                subTitle: respuesta.mensaje,
                                buttons: ['Aceptar']
                              });
                              alert.present();
                     
                     this.restablecerValores();         
                  }
                  else{
                      this.nativeAudio.play('Error', () => console.log('Error is done playing'));
                      this.vibration.vibrate(550);
                      let alert = this.alertCtrl.create({
                                title: 'Alerta',
                                subTitle: respuesta.mensaje,
                                buttons: ['Aceptar']
                              });
                              alert.present();

                      this.restablecerValores();         
                  }
    });
  }

  filtrarPor(filtroEntrante)
  {
    
    this.mostrar=true;
    switch (filtroEntrante) {
      case 'DIA':
        this.filtro = 'Dia';        
        break;  

      case 'AULA':
        this.filtro = 'Aula';
        break;

      case 'MATERIA':
        this.filtro = 'Materia';
          this.ARP.traerTodasLasMaterias().subscribe(item => {
          
          this.materias = item;
          if(item.length == 0)
          {
            this.showAlert("MATERIAS");
            this.restablecerValores();
          }
          else{
            this.cantidadMaterias = item.length;
          }
                   
        });
        break;

      case 'PROFESOR':
        this.filtro = 'Profesor';
        this.ARP.TraerProfesores().subscribe(item => {
          
          this.profesores = item;
          if(item.length == 0)
          {
            this.showAlert("PROFESOR");
            this.restablecerValores();
          }
          else{
            this.cantidadProfesores = item.length;
          }
                   
        });
        break;
      
    } 
  }

  filtrarPorDia(DiaEntrante)
  {
    this.ARP.traerComisionPorDia(DiaEntrante).subscribe(item => {
      this.comisiones = item;
      this.cantidadComisiones = item.length;
      this.diaSeleccionado = false;
      this.filtro = "false";
      if(this.cantidadComisiones == 0)
      {
        this.showAlert(DiaEntrante);
        this.restablecerValores();
      }     
    });
      
    
    
  }

  filtrarPorAula(aulaSeleccionado){
    this.ARP.traerComisionPorAula(aulaSeleccionado).subscribe(item => {
    this.comisiones = item;
      this.cantidadComisiones = item.length;
      this.aulaSeleccionado = false;
      this.filtro = "false";
      if(this.cantidadComisiones == 0)
      {
        this.showAlert(aulaSeleccionado);
        this.restablecerValores();
      }     
    });
    
  }

  filtrarPorMateria(idMateriaSeleccionada){
    this.ARP.traerComisionPorMateria(idMateriaSeleccionada).subscribe(item=>{
      this.comisiones = item;
      this.cantidadComisiones = item.length;
      this.materiaSeleccionado = false;
      this.filtro = "false";
      if(this.cantidadComisiones == 0)
      {
        this.showAlert("Materia");
        this.restablecerValores();
      }       
      
    });
  }

  filtrarPorComision(comisionIngresada)
  {
    this.ARP.traerAlumnosPorComision(comisionIngresada).subscribe(item=>{
      this.alumnos = item;
      this.cantidadAlumnos = item.length;
      this.cantidadComisiones = 0;
      this.comisionSeleccionada = false;
      if(this.cantidadAlumnos == 0)
      {
        this.showAlert("Comision");
        this.restablecerValores();
      }
      else{
        for(var i = 0; i< this.cantidadAlumnos;i++)
        {
          this.arrayPresentes.push("Ausente");          
        }
        console.log(this.arrayPresentes);
        console.log(this.cantidadAlumnos);
      }
    });
  }

  filtrarPorProfesor(idProfesor){
      this.ARP.traerComisionPorProfesor(idProfesor).subscribe(item=>{
      this.comisiones = item;
      this.cantidadComisiones = item.length;
      this.profesorSeleccionado = false;
      this.filtro = "false";
      if(this.cantidadComisiones == 0)
      {
        this.showAlert("PROFESOR");
        this.restablecerValores();
      }       
      
    });    
  }


  showAlert(criterioBusqueda) {
    this.vibration.vibrate(550);
    let alert = this.alertCtrl.create({
      title: 'BUSQUEDA VACIA',
      subTitle: 'Tu busqueda para ' + criterioBusqueda + " a resultado vacia",
      buttons: ['OK']
    });
    alert.present();
  }
}

class asistencia {
    id_alumno: number;
    id_comision: number;
    fecha : string;
    estado : string;
    constructor(alumno,comision,fecha,estado) {
        this.id_alumno = alumno;
        this.id_comision = comision;
        this.fecha = fecha;
        this.estado = estado;
    }    
}