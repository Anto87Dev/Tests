import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { QuotePage } from '../quote/quote';
import { SharedProvider } from '../../providers/shared/shared';
/**
 * Generated class for the ListaNozzePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-nozze',
  templateUrl: 'lista-nozze.html',
})
export class ListaNozzePage {

  regali : any[] = [{img:"assets/img/208460.jpg", nome: "SAMSUNG TVC 49UE49MU7000 SUHD FLA", codice: "208463", prezzo: "1.299", quota_disp: "1.129"}];
  pagina: string = "login";
  credenziali: Credenziali = {};
  constructor(public toast : ToastController, public shared: SharedProvider, public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad ListaNozzePage');
  
  }
  
  quote(prezzo){

    console.log("prezzo: ", prezzo);

    this.navCtrl.push(QuotePage, {prezzo: prezzo});

  }

  logIn(){

    if(this.validateEmail(this.credenziali.email)){

      if(this.credenziali.email === "test@test.it" && this.credenziali.password === "test"){

        this.pagina = "lista_nozze";
  
      }else{
  
        let toast = this.toast.create({
  
          duration: 3000,
          message: "Username o password errati!",
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
  

}

interface Credenziali {
  matricola?: string
  email?: string
  password?: string
}

