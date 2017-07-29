import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiRestProvider } from '../providers/api-rest-provider';
import { Auth } from '../providers/auth';
import { Login } from '../pages/login/login';
import { Menu } from '../pages/menu/menu';
import { AppState } from './app.global';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  //pages: Array<{title: string, component: any}>
  rootPage:any;
  state: any;

  constructor(platform: Platform, statusBar: StatusBar,splashScreen: SplashScreen,public auth:Auth,public ARP:ApiRestProvider, public global:AppState) {

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
      console.log("ENTRO APPCOMPONENT");
       
      if(this.auth.isLogued())
      {        
         console.log("VERIFICA EN MYAPP SI ESTA EL USER");  
              
         this.rootPage = Menu;
      } 
      else{
         this.rootPage = Login;
      } 
      

    /*this.pages = [
      { title: 'Perfil', component: HomePage },
      { title: 'Alta', component: AltaUsuarios },
      { title: 'Baja/Modificacion', component: BajaModificacion },
      { title: 'Tomar Asistencia', component: Asistencias },
      { title: 'Ver Asistencia', component: MostrarAsistencia },
      { title: 'Ver Asistencia en tus comisiones', component: ProfesorVistaasistencias },
      { title: 'Inscripcion Alumnos', component: InscripcionAlumnos },
      { title: 'Tus Asistencias', component: AlumnoAsistencia },
      { title: 'Asignacion de Materias', component: AsignarMateria },
      { title: 'Encuesta', component: Encuesta },
      { title: 'Salir', component: Login  }
    ];*/


  }



}
