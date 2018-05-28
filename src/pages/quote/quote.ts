import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the QuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {

  quote : any[] = [{codice: 1, quota: "30,00"}];

  quota: number;

  prezzo: number;

  constructor(public toast : ToastController, public shared: SharedProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {

    this.prezzo = this.navParams.data.prezzo;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotePage');
  }

  add_quota(){

    let prompt = this.alertCtrl.create({
      title: 'Quota',
      message: "Inserisci la tua quota (max."+this.shared.getQuotaDisp()+")",
      inputs: [
        {
          name: 'quota',
          placeholder: 'Quota',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Conferma',
          handler: data => {

            console.log("quota: "+Number(data.quota));

            console.log("this.prezzo: "+(Math.round(data.quota * 100) / 100).toFixed(2));

            if(Number(data.quota) <= this.prezzo){

              this.quota = data.quota;

              this.shared.decrementQuotaDisp(Number(data.quota));

            }else{

              let toast = this.toast.create({
                message: 'Non puoi inserire un importo superiore al prezzo!',
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
            
          }
        }
      ]
    });
    prompt.present();

  }

  removeQuota(index){

    this.shared.incrementQuotaDisp(Number(this.quote[index].quota));

    this.quote.splice(index, 1);
    
  }

  addToCart(){

    event.stopPropagation();

  }

}
