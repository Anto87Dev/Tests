import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VolantinoPage } from '../volantino/volantino';
import { CatLiv3Page } from '../cat-liv3/cat-liv3';
import { Livello_2 } from '../../model/livello_2';

/**
 * Generated class for the SottocategoriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sottocategorie',
  templateUrl: 'sottocategorie.html',
})
export class SottocategoriePage {

  categorie_liv_2: any;

  categorie : Livello_2 [] = [];

  titolo : String;

  sottocat1 : any = [{nome_cat:"smartphone e cellulari", empty: false}, {nome_cat:"accessori smartphone", empty: true}, {nome_cat:"telefoni domestici", empty: true}, {nome_cat:"wearable", empty: true}, {nome_cat:"tempo libero", empty: true}, {nome_cat:"navigazione e gps", empty: true}];  

  sottocat2 : any = [{nome_cat:"tablet", empty: false}, {nome_cat:"e-reader", empty: true}, {nome_cat:"computer portatili", empty: true}, {nome_cat:"pc desktop e monitor", empty: true}, {nome_cat:"stampanti e multifunzione", empty: true}, {nome_cat:"networking", empty: true}, {nome_cat:"software", empty: true}, {nome_cat:"accessori", empty: true}, {nome_cat:"computer portatili", empty: true}];

  sottocat3 : any = [{nome_cat:"tv", empty: false}, {nome_cat:"decoder", empty: true}, {nome_cat:"home, audio e video", empty: true}, {nome_cat:"dvd e blu-ray", empty: true}, {nome_cat:"hi-fi", empty: true}, {nome_cat:"audio mobile", empty: true}, {nome_cat:"fotocamere", empty: true}, {nome_cat:"videocamere", empty: true}];

  sottocat4 : any = [{nome_cat:"libera installazione", empty: false}, {nome_cat:"incasso", empty: true}, {nome_cat:"condizionatori", empty: true}, {nome_cat:"riscaldamento", empty: true}, {nome_cat:"trattamento aria", empty: true}, {nome_cat:"ventilatori", empty: true}];
  
  sottocat5 : any = [{nome_cat:"cottura cibi", empty: false}, {nome_cat:"preparazione cibi", empty: true}, {nome_cat:"cura della persona", empty: true}, {nome_cat:"pulizia della casa", empty: true}, {nome_cat:"caffè e colazione", empty: true}];  

  sottocat6 : any = [{nome_cat:"playstation", empty: false}, {nome_cat:"xbox", empty: true}, {nome_cat:"nintendo", empty: true}, {nome_cat:"informatica per game", empty: true}];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
   /* this.index = this.navParams.data.index;
  
    console.log("index: "+this.index);
*/ 
    this.categorie_liv_2 = this.navParams.data.categorie_liv_2;
  
    console.log("categorie_liv_2: "+JSON.stringify(this.categorie_liv_2));

    this.titolo = this.categorie_liv_2.nome_cat_liv_1;

    this.categorie = this.categorie_liv_2.categorie_liv_2;

  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad SottocategoriePage');
  
  }

  toCatLiv3(index){

    this.navCtrl.push(CatLiv3Page, {index: index});

  }

}
