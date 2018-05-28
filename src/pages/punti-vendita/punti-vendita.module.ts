import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PuntiVenditaPage } from './punti-vendita';

@NgModule({
  declarations: [
    PuntiVenditaPage,
  ],
  imports: [
    IonicPageModule.forChild(PuntiVenditaPage),
  ],
})
export class PuntiVenditaPageModule {}
