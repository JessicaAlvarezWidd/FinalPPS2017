import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { Asistencias } from '../asistencias/asistencias';
import { Encuesta } from '../encuesta/encuesta';
//import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
import { MostrarAsistencia } from '../mostrar-asistencia/mostrar-asistencia';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Injectable()
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  public usuario:Usuario=new Usuario(null);

 constructor(public navCtrl: NavController,public ARP:ApiRestProvider, public geolocation: Geolocation) {
    console.log("ENTRO HOME"); 
    this.traerUserLogueado();
  }


  traerUserLogueado(){

    this.ARP.decodeToken().subscribe(datos=>{
          this.usuario=new Usuario(datos.tokenDecode.usuario[0]);
      });
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });
      
        let content = "<h4>Usted esta Aquí!</h4>";          
      
        this.addInfoWindow(marker, content);
        
        }, (err) => {
          console.log(err);
        });
 
  }


  addInfoWindow(marker, content){
 
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
    
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
 
  }


}
