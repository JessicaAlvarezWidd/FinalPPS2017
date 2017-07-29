import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BajaModificacion } from './baja-modificacion';

@NgModule({
  declarations: [
    BajaModificacion,
  ],
  imports: [
    IonicPageModule.forChild(BajaModificacion),
  ],
  exports: [
    BajaModificacion
  ]
})
export class BajaModificacionModule {}
