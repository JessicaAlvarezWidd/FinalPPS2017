import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Theming } from './theming';

@NgModule({
  declarations: [
    Theming,
  ],
  imports: [
    IonicPageModule.forChild(Theming),
  ],
  exports: [
    Theming
  ]
})
export class ThemingModule {}
