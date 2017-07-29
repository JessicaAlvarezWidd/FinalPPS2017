import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import {HttpModule} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  arrayIdiomas : Array<any>=[
    {"ES" : "Hola Mundo" , "PT" : "Alô Mundo", "FR" : "Salut Monde" , "DE" : "Hallo Welt" , "EN" : "Hello World" , "IT" : "Ciao Mondo"},
    {"ES" : "Casa" , "PT" : "Casa", "FR" : "Maison" , "DE" : "Haus" , "EN" : "Home" , "IT" : "Casa"}
  ];



  
  idioma;


  constructor(public navCtrl: NavController,public ARP:ApiRestProvider) {

    //localStorage.setItem("habla","ES");
    this.idioma = localStorage.getItem("habla");

    //console.log(this.arrayIdiomas[0][this.idioma]);
    //console.log(this.arrayIdiomas[1][this.idioma]);
    
      this.ARP.getDireccion("-22.9109878","-43.7285264").then( //BR
        data => {
          console.log(data);
          console.log(data.results["0"].address_components[5].short_name);
        }
      );
      this.ARP.getDireccion('51.5285582','-0.2417006').then( //GB
        data => {
          console.log(data);
          console.log(data.results["0"].address_components[7].short_name);
        }
      );
      
      this.ARP.getDireccion('48.8588377','2.2775173').then( //FR
        data => {
          console.log(data);
          console.log(data.results["0"].address_components[5].short_name);          
        }
      );

    
      this.ARP.getDireccion("-34.6157142","-58.5033604").then( //ES
        data => {
          console.log(data);
          console.log(data.results["0"].address_components[6].short_name);
        }
      );
      this.ARP.getDireccion('41.909986','12.3959141').then( //ITALIA
        data => {
          console.log(data);
          console.log(data.results["0"].address_components[6].short_name);
        }
      );
      
      this.ARP.getDireccion('52.5072111','13.1459683').then( //ALEMANIA
        data => {
          console.log(data);
          console.log(data.results["0"].address_components[6].short_name);          
        }
      );

  }
  
  obtenerIdioma()
  {
    console.log("entre obtener idioma",this.idioma);
    this.idioma = localStorage.getItem("habla");
    return true;

  }


}