import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarAsistencia } from './mostrar-asistencia';

@NgModule({
  declarations: [
    MostrarAsistencia,
  ],
  imports: [
    IonicPageModule.forChild(MostrarAsistencia),
  ],
  exports: [
    MostrarAsistencia
  ]
})
export class MostrarAsistenciaModule {}
