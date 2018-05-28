import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Servizi } from '../../model/servizi';

/**
 * Generated class for the ServiziModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servizi-modal',
  templateUrl: 'servizi-modal.html',
})
export class ServiziModalPage {

  servizio: Servizi;

  titolo : string;

  descrizione: string; 
  
  immagine: string;

  constructor( public viewCtrl: ViewController, private navParams: NavParams) {

  }

  ngOnInit() {
    
    if (this.navParams.data) {
  
      this.servizio = this.navParams.data.servizio;

      this.titolo = this.servizio.titolo;

      this.descrizione = this.servizio.descrizione;
  
    }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
