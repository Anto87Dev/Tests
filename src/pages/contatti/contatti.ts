import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ContattiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contatti',
  templateUrl: 'contatti.html',
})
export class ContattiPage {

  regali : any[] = [{img:"assets/img/208460.jpg", nome: "SAMSUNG TVC 49UE49MU7000 SUHD FLA", codice: "208463", prezzo: "1.299", quota_disp: "1.129"}];
  
  pagina: string = "login";
  
  credenziali: Credenziali = {};

  lista_punti_vendita: any[] = [{nome:"Expert Megastore Castellammare di Stabia"},
  {nome:"Expert Store Castellammare di Stabia"},
  {nome:"Expert Megastore Pagani C/C Pegaso"},
  {nome:"Expert Megastore Nocera Superiore C/C Nuceria"},
  {nome:"Expert Megastore Torre del Greco"},
  {nome:"Expert Megastore Battipaglia"},
  {nome:"Expert Megastore Salerno zona INDUSTRIALE"},
  {nome:"Centro Telefonia Castellammare di Stabia"},
  {nome:"Expert Megastore Ercolano - Galleria Le Pendici"},
  {nome:"Expert Megastore Salerno C/C Le Cotoniere"},
  {nome:"Expert CITY Vigi Elettronica"},
  {nome:"Expert CITY Molisso"}];
  
  constructor(private call : CallNumber, public toast : ToastController, public navCtrl: NavController, public navParams: NavParams) {
  
  
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad ListaNozzePage');
  
  }
  

  logIn(){

    if(this.validateEmail(this.credenziali.email)){

      if(this.credenziali.cellulare !== "" && this.credenziali.oggetto !== "" && this.credenziali.testo !== ""){

        //this.pagina = "lista_nozze";
  
        console.log("ok");

      }else{
  
        let toast = this.toast.create({
  
          duration: 3000,
          message: "Alcuni campi sono obbligatori!",
          position: 'top'
  
        });
  
        toast.present();
  
      }

    }else{

      let toast = this.toast.create({
  
        duration: 3000,
        message: "L'indirizzo email è formattato in modo errato!",
        position: 'top'

      });

      toast.present();


    }

  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  chiama(numero: string){

    this.call.callNumber(numero, true).then(() => 
    {

      console.log("Chiamata in corso...");

    }).catch(() => {

      console.log("Errore chiamata!");
      
    });

    
  }

}

interface Credenziali {
  nominativo?: string
  email?: string
  cellulare?: string
  puntoVendita?: string
  oggetto?: string
  testo?: string
}
