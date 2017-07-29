import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaUsuarios } from './alta-usuarios';

@NgModule({
  declarations: [
    AltaUsuarios,
  ],
  imports: [
    IonicPageModule.forChild(AltaUsuarios),
  ],
  exports: [
    AltaUsuarios
  ]
})
export class AltaUsuariosModule {}
