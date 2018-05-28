import { Injectable } from '@angular/core';
import { Prodotti } from '../../model/prodotti';
/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  private tutorial: boolean = true;
  private wishlist: Prodotti[] = [];
  //private volantino: Prodotti[] = [];
  private volantino: { [id: string] : Prodotti[] } = {};
  private quota_disp: number = 1129;

  private count_selected_compare : number = 0;

  private compare_cat: string = '';

  constructor() {

    console.log('Hello SharedProvider Provider');
    
  }

  setQuotadisp(value){

    this.quota_disp = value;

  }

  getQuotaDisp(){

    return this.quota_disp;

  }

  incrementQuotaDisp(value){

    console.log("quota_disp: "+this.quota_disp+" - "+value);

    this.quota_disp = this.quota_disp + value;

  }

  decrementQuotaDisp(value){

    
    this.quota_disp = this.quota_disp - value;

  }

  setTutorial(value){

    this.tutorial = value;

  }

  getTutorial(){

    return this.tutorial;

  }

  setWishlist(value){

    this.wishlist.push(value);

  }

  getWishlist(){

    return this.wishlist;

  }

  setVolantino(cat, value){

    this.volantino[cat] = value;

  }

  getVolantino(){

    return this.volantino;

  }

  incrementCountSelectedItem(){
    
      this.count_selected_compare = this.count_selected_compare + 1;      

  }

  decrementCountSelectedItem(){


      if(this.count_selected_compare > 0){

        this.count_selected_compare = this.count_selected_compare - 1;
  
      }

  }

  getCountSelectedItem(){

      return this.count_selected_compare;      

  }

  setCompareCat(cat){

    this.compare_cat = cat;

  }

  getCompareCat(){

    return this.compare_cat;

  }
  

}
