import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiziModalPage } from './servizi-modal';

@NgModule({
  declarations: [
    ServiziModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiziModalPage),
  ],
})
export class ServiziModalPageModule {}
