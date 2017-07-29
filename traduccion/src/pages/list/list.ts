import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  idioma : string;
  titulo : Array<any> = [
    {"ES" : "Lista" , "EN" : "List" , "FR" : "Liste", "DE" : "Auflistung", "PT" : "Lista" , "IT" : "Lista"}
  ];

  arrayIdiomas : Array<any>=[
      {"ES" : "Hola Mundo" , "PT" : "Alô Mundo", "FR" : "Salut Monde" , "DE" : "Hallo Welt" , "EN" : "Hello World" , "IT" : "Ciao Mondo"},
      {"ES" : "Casa" , "PT" : "Casa", "FR" : "Maison" , "DE" : "Haus" , "EN" : "Home" , "IT" : "Casa"}
    ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.idioma = localStorage.getItem("habla");

  }

  obtenerIdioma()
  {
    console.log("entre obtener idioma",this.idioma);
    this.idioma = localStorage.getItem("habla");
    return true;

  }
}
