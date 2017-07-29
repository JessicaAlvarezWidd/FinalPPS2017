import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesorVistaasistencias } from './profesor-vistaasistencias';

@NgModule({
  declarations: [
    ProfesorVistaasistencias,
  ],
  imports: [
    IonicPageModule.forChild(ProfesorVistaasistencias),
  ],
  exports: [
    ProfesorVistaasistencias
  ]
})
export class ProfesorVistaasistenciasModule {}
