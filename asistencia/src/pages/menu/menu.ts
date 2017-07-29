import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { Login } from '../login/login';
import { AltaUsuarios } from '../alta-usuarios/alta-usuarios';
import { InscripcionAlumnos } from '../inscripcion-alumnos/inscripcion-alumnos';
import { AlumnoAsistencia } from '../alumno-asistencia/alumno-asistencia';
import { AsignarMateria } from '../asignar-materia/asignar-materia';
import { Asistencias } from '../asistencias/asistencias';
import { ProfesorVistaasistencias } from '../profesor-vistaasistencias/profesor-vistaasistencias';
import { HomePage } from '../home/home';
import { Encuesta } from '../encuesta/encuesta';
import { BajaModificacion } from '../baja-modificacion/baja-modificacion';
import { MostrarAsistencia } from '../mostrar-asistencia/mostrar-asistencia';
import { Themind } from '../themind/themind';

import { ApiRestProvider } from '../../providers/api-rest-provider';
import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  rootPage: any;
  public perfil;
  public alta;
  public bajamodificacion;
  public tomarasistencia;
  public verAsistencias;
  public asistenciasprofesor;
  public asistenciasAlumnos;
  public inscripcionAlumnos;
  public profesoresMaterias;
  public encuesta;
  public salir;
  public Tipousuario=" ";
  public themind;

  constructor(public navCtrl: NavController,public ARP:ApiRestProvider,public navParams: NavParams,public auth:Auth) {
    
    this.ARP.decodeToken().subscribe(t=>{this.Tipousuario=t.tokenDecode.usuario[0].tipo;} );
    
    this.asignarPages();

    this.rootPage=HomePage;
  }

   asignarPages(){
     this.perfil= { title: 'Perfil', component: HomePage };
     this.alta= { title: 'Alta', component: AltaUsuarios };
     this.bajamodificacion= { title: 'Baja/Modificacion', component: BajaModificacion };
     this.tomarasistencia= { title: 'Tomar Asistencia', component: Asistencias };
     this.verAsistencias= { title: 'Ver Asistencia', component: MostrarAsistencia };
     this.asistenciasprofesor= { title: 'Ver tus comisiones', component: ProfesorVistaasistencias };
     this.inscripcionAlumnos= { title: 'Inscripcion Alumnos', component: InscripcionAlumnos };
     this.asistenciasAlumnos= { title: 'Tus Asistencias', component: AlumnoAsistencia };
     this.profesoresMaterias= { title: 'Asignacion de Materias', component: AsignarMateria };
     this.encuesta= { title: 'Encuesta', component: Encuesta };
     this.salir= { title: 'Salir', component: Login  };
     this.themind= { title: 'Theme', component: Themind};
  }

  openPage(p){
    if(p.title=="Salir")
    {
      this.auth.logOut();
      this.navCtrl.setRoot(Login);
    }
    else{
     // this.rootPage=p.component;
     this.rootPage=p.component; 
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

}
