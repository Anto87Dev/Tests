import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdottiPage } from '../prodotti/prodotti';
import { Livello_3 } from '../../model/livello_3';

/**
 * Generated class for the CatLiv3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cat-liv3',
  templateUrl: 'cat-liv3.html',
})
export class CatLiv3Page {

  index: any;

  categorie : Livello_3 [] = [];

  titolo : String;

  sottocat1 : any = [{nome_cat:"smartphone", empty: false}, {nome_cat:"iphone", empty: true}, {nome_cat:"cellulari", empty: true}];  

  sottocat2 : any = [{nome_cat:"cover"}, {nome_cat:"pellicole"}, {nome_cat:"visori realtà virtuale"}, {nome_cat:"auricolari / cuffie"}, {nome_cat:"memorie"}, {nome_cat:"carica batterie"}, {nome_cat:"supporti"}];

  sottocat3 : any = [{nome_cat:"cordless"}, {nome_cat:"telefoni a filo"}, {nome_cat:"accessori fax"}];

  sottocat4 : any = [{nome_cat:"smartwatch / smartband"}];
  
  sottocat5 : any = [{nome_cat:"walkie talkie"}, {nome_cat:"fitness e accessori"}, {nome_cat:"droni"}, {nome_cat:"hoverboard"}, {nome_cat:"speaker bluetooth"}, {nome_cat:"monopattini"}, {nome_cat:"biciclette elettriche"}, {nome_cat:"strumenti musicali"}];  

  sottocat6 : any = [{nome_cat:"navigatori portatili"}, {nome_cat:"accessori"}];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.index = this.navParams.data.index;
  
    this.categorie = this.index.categorie_liv_3;

    console.log("index: "+this.index.categorie_liv_3);
    
    this.titolo = this.index.nome_cat_liv_2;
  
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad CatLiv3Page');
  
  }

  toProdotti(nome_cat){

    this.navCtrl.push(ProdottiPage, {nome_cat: nome_cat});

  }

}
