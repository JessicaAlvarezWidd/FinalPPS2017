import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Themind } from './themind';

@NgModule({
  declarations: [
    Themind,
  ],
  imports: [
    IonicPageModule.forChild(Themind),
  ],
  exports: [
    Themind
  ]
})
export class ThemindModule {}
