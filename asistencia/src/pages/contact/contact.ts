import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public alumnos;

  constructor(public navCtrl: NavController,public ARP:ApiRestProvider) {
    this.traerAlumnos();
  }

  traerAlumnos(){
    this.ARP.traerAlumnos().subscribe(datos => {this.alumnos=datos});
  }
}
