import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the SchedaPuntoVenditaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scheda-punto-vendita',
  templateUrl: 'scheda-punto-vendita.html',
})
export class SchedaPuntoVenditaPage {

  item : any;

  nome_punto_vendita: string;

  indirizzo_punto_vendita: string;

  email_punto_vendita: string;

  recapito_punto_vendita: string;
  
  cap_punto_vendita: string;

  localita: string;

  index : number;

  latitudine: number = 40.9042552;

  longitudine: number = 14.3357194;

  distanza: string;

  constructor(private emailComposer: EmailComposer, private launch: LaunchNavigator, private call : CallNumber, public navCtrl: NavController, public navParams: NavParams) {
  
    this.item = navParams.data.item; 

    this.index = navParams.data.index;

    this.nome_punto_vendita = this.item.nome;

    this.indirizzo_punto_vendita = this.item.indirizzo;

    this.recapito_punto_vendita = this.item.recapito;

    this.email_punto_vendita = this.item.email;

    this.cap_punto_vendita = this.item.cap;

    this.distanza = this.item.distanza;

    this.localita = this.item.citta+" ("+this.item.provincia+")";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedaPuntoVenditaPage');
  }

  chiama(){

    this.call.callNumber(this.recapito_punto_vendita, true).then(() => 
    {

      console.log("Chiamata in corso...");

    }).catch(() => {

      console.log("Errore chiamata!");
      
    });

    
  }

  indicazioni(){

    /*  let toast = this.toastCtrl.create({
       message: 'Indicazioni',
       duration: 3000,
       position: 'top'
     });
 
     toast.present(); */
     console.log("lat2 - lng2: "+this.latitudine+" - "+this.longitudine);
     this.launch.navigate(this.indirizzo_punto_vendita, {
       start: [this.latitudine, this.longitudine]
   });
 
   }

   email(){

    let email = {
      to: this.email_punto_vendita,
      /* attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ], */
      subject: '',
      body: '',
      isHtml: true
    };
    
    // Send a text message using default options
    this.emailComposer.open(email);

   }

}
