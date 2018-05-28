import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaNozzePage } from './lista-nozze';

@NgModule({
  declarations: [
    ListaNozzePage,
  ],
  imports: [
    IonicPageModule.forChild(ListaNozzePage),
  ],
})
export class ListaNozzePageModule {}
