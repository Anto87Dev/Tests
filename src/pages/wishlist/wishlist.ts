import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; 
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { SchedaProdottoPage } from '../scheda-prodotto/scheda-prodotto';
import { SocialSharing } from '@ionic-native/social-sharing'; 
import { SharedProvider } from '../../providers/shared/shared';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Prodotti } from '../../model/prodotti';
import { PopoverPage } from '../volantino/volantino';
import { ConfrontoPage } from '../confronto/confronto';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  templateUrl: '../sortTemplate.html'
})
export class PopoverPage2 {
  
  items: any;

  sortCriteria: string = "";

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    
    if (this.navParams.data) {
  
      this.items = this.navParams.data.array;
  
    }

  }

  sort(){

    switch(this.sortCriteria){

      case "0":
      
      this.items.sort((a, b) => a.prezzo < b.prezzo ? -1 : a.prezzo > b.prezzo ? 1 : 0);

      console.log(this.items);

      break;

      case "1":

      this.items.sort((a, b) => b.prezzo < a.prezzo ? -1 : b.prezzo > a.prezzo ? 1 : 0);

      break;

      case "2":

      this.items.sort((a, b) => a.nome.toLowerCase() < b.nome.toLowerCase() ? -1 : a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : 0);

      break;

      case "3":

      this.items.sort((a, b) => b.nome.toLowerCase() < a.nome.toLowerCase() ? -1 : b.nome.toLowerCase() > a.nome.toLowerCase() ? 1 : 0);

      break;

    }
    
  }

  
}


@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  compareProducts: any[] = [];

  testo: string = "";

  formato: string = "";

  margin: number = 0;

  nome_cat: string;

  cat: string = '';

  prodotti : Prodotti[] = [];

  searchWord : String = "-";

  searchSize : number = 0;

  elem: number = 8;

  prodotti_ricerca: any[] = [];

  arr_wishlist: any[] = [];

  constructor(private keyboard: Keyboard, public navParams: NavParams, private toast: ToastController,  private screen: ScreenOrientation, private shared : SharedProvider, private sharing: SocialSharing, private popoverCtrl: PopoverController, private scanner: BarcodeScanner, public navCtrl: NavController) {

    this.inizializzaElementi();

}

  ionViewDidLoad(){

  }
  
  ionViewDidEnter(){

     this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT); 

  }

  
  inizializzaElementi(){

  this.prodotti = this.shared.getWishlist();
    
  this.prodotti_ricerca = this.prodotti.slice(0,this.elem);

}

  resetArray(){

    this.prodotti = this.shared.getWishlist();
    
  this.prodotti_ricerca = this.prodotti.slice(0,this.elem);
        
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.resetArray();

    // set val to the value of the ev target
    var val = ev.target.value;

    this.searchWord = val;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      this.prodotti = this.prodotti.filter((item) => {

        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      
      })
    
    }
    
    this.searchSize = this.prodotti.length;

    this.prodotti_ricerca = this.prodotti.slice(0,this.elem);
  
  }

  scan(){

     this.scanner.scan().then((barcodeData) => {
      // Success! Barcode data is here

      console.log("scan data: "+JSON.stringify(barcodeData));

      this.testo = barcodeData.text;

      this.formato = barcodeData.format;

     }, (err) => {

      console.log("scan data: "+JSON.stringify(err));

         // An error occurred
     }); 

  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {array: this.prodotti});

    popover.present({
      ev: ev
    });
  }

  schedaProdotto(prodotto: any){

    event.stopPropagation();

     this.navCtrl.push(SchedaProdottoPage, {prodotto: prodotto} );

  }

  confronta(){

    if(this.shared.getCountSelectedItem() >= 2 && this.shared.getCountSelectedItem() <= 4){

      this.navCtrl.push(ConfrontoPage);

    }else{

      if(this.shared.getCountSelectedItem() < 2){

        let toast = this.toast.create({
          message: 'Devi selezionare almeno due prodotti',
          duration: 3000,
          position: 'top'
        });

        toast.present();

      }else if(this.shared.getCountSelectedItem() > 4){

        let toast = this.toast.create({
          message: 'Puoi selezionare massimo quattro prodotti',
          duration: 3000,
          position: 'top'
        });

        toast.present();

      }

    }

    

  }

  doInfinite(infiniteScroll) {
    
    console.log('Begin async operation');

    setTimeout(() => {
      
      for (let i = this.elem; i < this.elem + 8; i++) {

        if(i <= this.prodotti.length){

          this.prodotti_ricerca.push(this.prodotti[i]);

        }

      } 
      
      this.elem = this.elem + 8;

      console.log('Async operation has ended');

      infiniteScroll.complete();
      
    }, 1000); 

  }

  share(msg){

    event.stopPropagation();    
     
     this.sharing.share(null, null, "http://www.google.it");
    
  }

  /* addWishlist(item, index){

    event.stopPropagation();

    var cat: string = item.categoria;

    cat = cat.toLowerCase();

    var heartIcon = <HTMLInputElement>document.getElementById('heart_'+String(index));

    if(this.shared.getVolantino()[cat][index].wishlist === true){

      this.shared.getVolantino()[cat][index].wishlist = false;

      heartIcon.style.color = "#ea5b0c";      

    }else{

      this.shared.getVolantino()[cat][index].wishlist = true;

      heartIcon.style.color = "#d9d9d9";            

    }

  } */

  addWishlist(item, index){

    event.stopPropagation();
  
    var cat: string = item.categoria;
  
    cat = cat.toLowerCase();
  
     var heartIcon = <HTMLInputElement>document.getElementById('heart_'+String(index));
  
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

  closeKeyboard(){

    this.keyboard.close();
  
    this.elem = 8;
  
   }
  
   onCancel(event){
  
    this.searchWord = '';
  
    this.prodotti = [];
  
    this.elem = 8;
    
  }

  addToCompare(item, index){

    console.log("clikc");

    event.stopPropagation();   
  
    var new_cat: string = String(item.categoria);
  
    new_cat = new_cat.toLowerCase();
  
    if(this.shared.getCompareCat() != ''){

      this.cat = this.shared.getCompareCat();
  
    }else{
  
      this.cat = this.nome_cat;
  
    }
  
    if(this.cat === new_cat){
  
        this.shared.setCompareCat(this.nome_cat);
  
        var compareButton = <HTMLInputElement>document.getElementById('compareButton_'+String(index));
  
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

  prezzo_scontato(prezzo, sconto){

     return ((Number(prezzo)*Number(sconto)/100) - Number(prezzo)).toFixed(2);


  }


}
