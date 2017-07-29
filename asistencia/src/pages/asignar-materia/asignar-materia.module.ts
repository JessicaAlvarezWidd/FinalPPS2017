import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsignarMateria } from './asignar-materia';

@NgModule({
  declarations: [
    AsignarMateria,
  ],
  imports: [
    IonicPageModule.forChild(AsignarMateria),
  ],
  exports: [
    AsignarMateria
  ]
})
export class AsignarMateriaModule {}
