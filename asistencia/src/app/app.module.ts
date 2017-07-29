import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { Registro } from '../pages/registro/registro';
import { AltaUsuarios } from '../pages/alta-usuarios/alta-usuarios';
import { Asistencias } from '../pages/asistencias/asistencias';
import { InscripcionAlumnos } from '../pages/inscripcion-alumnos/inscripcion-alumnos';
import { AlumnoAsistencia } from '../pages/alumno-asistencia/alumno-asistencia';
import { ProfesorVistaasistencias } from '../pages/profesor-vistaasistencias/profesor-vistaasistencias';
import { AsignarMateria } from '../pages/asignar-materia/asignar-materia';
import { BajaModificacion } from '../pages/baja-modificacion/baja-modificacion';
import { Encuesta } from '../pages/encuesta/encuesta';
import { MostrarAsistencia } from '../pages/mostrar-asistencia/mostrar-asistencia';
import { Graficos } from '../pages/graficos/graficos';
import { Menu } from '../pages/menu/menu';
import { Themind } from '../pages/themind/themind';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiRestProvider } from '../providers/api-rest-provider';
import { Auth } from '../providers/auth';
import { AppState } from './app.global';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { Geolocation } from '@ionic-native/geolocation';

export function getAuthHttp(http,options:RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: "token",
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('token')),
  }), http,options);
}

var configFirebase  = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBTJtBvtolDEkYMNA04K-lLiuEEiPFui1c",
    authDomain: "ppssegundoparcial.firebaseapp.com",
    databaseURL: "https://ppssegundoparcial.firebaseio.com",
    projectId: "ppssegundoparcial",
    storageBucket: "ppssegundoparcial.appspot.com",
    messagingSenderId: "391871260329"
  
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login,
    Registro,
    AltaUsuarios,
    Asistencias,
    InscripcionAlumnos,
    AlumnoAsistencia,
    AsignarMateria,
    ProfesorVistaasistencias,
    Encuesta,
    BajaModificacion,
    MostrarAsistencia,
    Graficos,
    Menu,
    Themind
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configFirebase.firebase),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login,
    Registro,
    AltaUsuarios,
    Asistencias,
    InscripcionAlumnos,
    AlumnoAsistencia,
    AsignarMateria,
    ProfesorVistaasistencias,
    Encuesta,
    BajaModificacion,
    MostrarAsistencia,
    Graficos,
    Menu,
    Themind
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiRestProvider,
    Auth,
    HttpModule,
    AngularFireAuth,
    Vibration,
    AppState,
    Geolocation,
    AngularFireDatabase,
    {provide: AuthHttp,
    useFactory: getAuthHttp,
    deps: [Http]},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeAudio
  ]
})
export class AppModule {}
