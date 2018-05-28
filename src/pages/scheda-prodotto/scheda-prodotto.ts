import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the SchedaProdottoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scheda-prodotto',
  templateUrl: 'scheda-prodotto.html',
})
export class SchedaProdottoPage {

  prodotto: any;

  isOpen: boolean = false;

  isOpen1: boolean = false;
  
  isOpen2: boolean = false;

  arr_wishlist: any[] = [];

  cat: string = '';

  constructor(private toast: ToastController, private shared : SharedProvider, public navCtrl: NavController, public navParams: NavParams) {
  
    this.prodotto = navParams.data.prodotto;
  
  }

  ionViewDidLoad() {
  
    console.log('ionViewDidLoad SchedaProdottoPage');
  
  }

  addWishlist(item){

    event.stopPropagation();
  
    var cat: string = item.categoria;
  
    cat = cat.toLowerCase();
  
     var heartIcon = <HTMLInputElement>document.getElementById('heart');
  
     var item_index = this.shared.getVolantino()[cat].indexOf(item);
  
    console.log("wishlist: ",this.shared.getVolantino()[cat][item_index].wishlist);
  
    if(this.shared.getVolantino()[cat][item_index].wishlist === true){
  
      this.shared.getVolantino()[cat][item_index].wishlist = false;
  
      var rm_index = this.arr_wishlist.indexOf(item);
  
      this.shared.getWishlist().splice(rm_index, 1);
  
      heartIcon.style.color = "#ea5b0c";      
  
    }else{
  
      this.shared.getVolantino()[cat][item_index].wishlist = true;
  
      heartIcon.style.color = "#d9d9d9";       
      
      this.shared.setWishlist(item);
  
      console.log("setWishlist: ", this.shared.getWishlist());
  
    }
  
    console.log("volantino: "+JSON.stringify(this.shared.getVolantino()[item_index]));
  
  }

  addToCompare(item){

    event.stopPropagation();   
  
    var new_cat: string = String(item.categoria);
  
    new_cat = new_cat.toLowerCase();
  
    if(this.shared.getCompareCat() != ''){
  
      this.cat = this.shared.getCompareCat();
  
    }else{
  
      this.cat = new_cat;
  
    }
  
    if(this.cat === new_cat){
  
        this.shared.setCompareCat(new_cat);
  
        var compareButton = <HTMLInputElement>document.getElementById('compareButton');
  
        var content = <HTMLInputElement>document.getElementById('content');
      
        var child = <HTMLInputElement>content.children[1];
      
        var item_index = this.shared.getVolantino()[this.cat].indexOf(item);
  
        if(this.shared.getVolantino()[this.cat][item_index].compare === true){
      
          this.shared.getVolantino()[this.cat][item_index].compare = false;
      
          compareButton.style.color = "#ea5b0c";
  
          this.shared.decrementCountSelectedItem();
      
        }else{
      
          this.shared.getVolantino()[this.cat][item_index].compare = true;
      
          compareButton.style.color = "#d9d9d9";            
            
          this.shared.incrementCountSelectedItem();
      
        }
      
        console.log("count_selected_elements: "+this.shared.getCountSelectedItem());
      
        if(this.shared.getCountSelectedItem() === 0){
      
          //child.style.marginTop = '128px';
  
          this.shared.setCompareCat('');
  
          //this.array_prod = [];
  
          //console.log("home");
      
        }/* else if(this.shared.getCountSelectedItem() === 1){
      
          //child.style.marginTop = '180px';
      
          console.log("home");
  
        } */
  
    }else{
  
      let toast = this.toast.create({
        message: 'Non puoi confrontare prodotti di categorie diverse',
        duration: 3000,
        position: 'top'
      });
  
      toast.present();
  
    }
  
  
  }

  open(elem){

    console.log("elem: ", elem);

    switch(elem){

      case 1:

        console.log("case 1");

      if(this.isOpen === true){

        this.isOpen = false;
  
      }else{
  
        this.isOpen = true;

      }

      break;

    case 2:

      console.log("case 2");

      if(this.isOpen1 === true){

        this.isOpen1 = false;
  
      }else{
  
        this.isOpen1 = true;

      }

      break;

    case 3:

      console.log("case 2");

      if(this.isOpen2 === true){

        this.isOpen2 = false;
  
      }else{
  
        this.isOpen2 = true;

      }

      break;

    }

  }

}
