import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  pageTitulos : Array<any> = [
    {"ES" : "Casa" , "PT" : "Casa", "FR" : "Maison" , "DE" : "Haus" , "EN" : "Home" , "IT" : "Casa"},
    {"ES" : "Lista" , "EN" : "List" , "FR" : "Liste", "DE" : "Auflistung", "PT" : "Lista" , "IT" : "Lista"},
    {"ES" : "Menú" , "EN" : "Menu" , "FR" : "Menu", "DE" : "Menü", "PT" : "Menu" , "IT" : "menù"}	
  ];
  idiomaGeneral : string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    localStorage.setItem("habla","ES");
    this.idiomaGeneral = localStorage.getItem("habla");
    // used for an example of ngFor and navigation
    this.pages = [
      { title: this.pageTitulos[0][this.idiomaGeneral], component: HomePage },
      { title: this.pageTitulos[1][this.idiomaGeneral], component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  cambiarIdioma(idioma)
  {
    localStorage.setItem("habla",idioma);
    this.idiomaGeneral = idioma;
    this.pages = [
      { title: this.pageTitulos[0][this.idiomaGeneral], component: HomePage },
      { title: this.pageTitulos[1][this.idiomaGeneral], component: ListPage }
    ];
  }
}
