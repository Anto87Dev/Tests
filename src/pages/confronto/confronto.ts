import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SharedProvider } from '../../providers/shared/shared';
import { Prodotti } from '../../model/prodotti';

/**
 * Generated class for the ConfrontoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confronto',
  templateUrl: 'confronto.html',
})
export class ConfrontoPage {

  tabBarElement: any;

  array_prod: any[] = [];

  cat: string = '';

  constructor(private events: Events, public viewCtrl: ViewController, private screen: ScreenOrientation, public shared: SharedProvider, public navCtrl: NavController, public navParams: NavParams) {

    //this.array_prod = this.navParams.data.arr_compare;

    this.cat = this.navParams.data.cat;

    var lenght = this.shared.getVolantino()[this.cat].length;

    for(let i =0; i<lenght; i++){

     // console.log("getVolantino: ", this.shared.getVolantino()[this.cat][i].compare);

      if(this.shared.getVolantino()[this.cat][i].compare === true){

        this.array_prod.push(this.shared.getVolantino()[this.cat][i]);

      }

    }

    this.cat = this.navParams.data.cat;
    
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    screen.lock(this.screen.ORIENTATIONS.LANDSCAPE);

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ConfrontoPage');
  
  }

  ionViewWillEnter() {

    this.tabBarElement.style.display = 'none';

  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.events.unsubscribe('chat:received');
  }

  rimuovi(item, index){

    var item_index = this.shared.getVolantino()[this.cat].indexOf(item);

    this.shared.getVolantino()[this.cat][item_index].compare = false;

    this.shared.decrementCountSelectedItem();

    if(this.shared.getCountSelectedItem() == 1){

      this.viewCtrl.dismiss();

    }

  }


  

}
