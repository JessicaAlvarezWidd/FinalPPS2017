import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscripcionAlumnos } from './inscripcion-alumnos';

@NgModule({
  declarations: [
    InscripcionAlumnos,
  ],
  imports: [
    IonicPageModule.forChild(InscripcionAlumnos),
  ],
  exports: [
    InscripcionAlumnos
  ]
})
export class InscripcionAlumnosModule {}
