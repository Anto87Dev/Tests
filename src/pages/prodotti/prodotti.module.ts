import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdottiPage } from './prodotti';

@NgModule({
  declarations: [
    ProdottiPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdottiPage),
  ],
})
export class ProdottiPageModule {}
