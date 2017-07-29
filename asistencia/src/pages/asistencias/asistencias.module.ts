import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Asistencias } from './asistencias';

@NgModule({
  declarations: [
    Asistencias,
  ],
  imports: [
    IonicPageModule.forChild(Asistencias),
  ],
  exports: [
    Asistencias
  ]
})
export class AsistenciasModule {}
