import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnoAsistencia } from './alumno-asistencia';

@NgModule({
  declarations: [
    AlumnoAsistencia,
  ],
  imports: [
    IonicPageModule.forChild(AlumnoAsistencia),
  ],
  exports: [
    AlumnoAsistencia
  ]
})
export class AlumnoAsistenciaModule {}
