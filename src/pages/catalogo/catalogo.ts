import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; 
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { SottocategoriePage } from '../sottocategorie/sottocategorie';
import { SharedProvider } from '../../providers/shared/shared';
import { Livello_3 } from '../../model/livello_3';
import { Livello_2 } from '../../model/livello_2';
import { Livello_1 } from '../../model/livello_1';
import { SchedaProdottoPage } from '../scheda-prodotto/scheda-prodotto';
import { Keyboard } from '@ionic-native/keyboard';
import { ConfrontoPage } from '../confronto/confronto';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: '../sortTemplate.html'
})
export class PopoverPage {
  
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
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})
export class CatalogoPage {

  items: any[]= [];

  testo: string = "";

  formato: string = "";

  hide = false;

  show = true;

  categorie : Livello_1 [] = [];

  elem: number = 8;  

  prodotti_ricerca: any[] = [];

  searchWord : String = '';

  searchSize : number = 0;

  arr_compare: any[] = [];

  arr_wishlist: any[] = [];

  cat: string = '';

  array_prod: any[] = [];

  item = [
    
    {nome:"Telefonia e Navigazione", icona: "assets/img/smartphone.png", empty: false, color:"#ff6e1a"}, {nome:"Informatica", icona: "assets/img/tablet.png", empty: false, color:"#ff7e33"}, {nome:"Audio, Video e Fotografia", icona: "assets/img/television.png", empty: true, color:"#ff8e4d"}, {nome:"Elettrodomestici e Climatizzazione", icona: "assets/img/clima.png", empty: true, color:"#ff9e66"}, {nome:"Piccoli elettrodomestici", icona: "assets/img/clima.png", empty: true, color:"#ffae88"}, {nome:"Game", icona: "assets/img/console.png", empty: true, color:"#ffbe99"}];

  constructor(private keyboard: Keyboard, private popoverCtrl: PopoverController, private scanner: BarcodeScanner, public navCtrl: NavController, public shared: SharedProvider, private toast: ToastController, private screen: ScreenOrientation) {

    this.iniziliazza_categorie();

    this.inizializzaElementi();

    
  
  }

  itemSelected(item: string) {

    console.log("Selected Item", item);
  
  }

  ionViewCanEnter(){

    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT); 

  }


  inizializzaElementi(){

    this.items = [];

    this.items = this.items.concat(this.shared.getVolantino()["smartphone"]);

    this.items = this.items.concat(this.shared.getVolantino()["tablet"]);

    this.items = this.items.concat(this.shared.getVolantino()["qled tv"]);
    
    this.items = this.items.concat(this.shared.getVolantino()["lavatrici carica frontale"]);    

    this.items = this.items.concat(this.shared.getVolantino()["forni a micronde"]);

    this.items = this.items.concat(this.shared.getVolantino()["giochi ps4"]);
 
    /* console.log("catalogo: "+JSON.stringify(this.items)); */
    
    /* [{nome: "A Philips 4000 series TV", immagine: "assets/img/prodotti/1.jpeg", descrizione: "LED ultra sottile Full HD", categoria: "tv led", prezzo: "239,00", codice: "32PFS4132/12"}, {nome: "B Panasonic TX-32E303", immagine: "assets/img/prodotti/1.jpeg", descrizione: "32'' HD NERO LED TV", categoria: "tv led", prezzo: "229,00", codice: "TX-32E303"}, {nome: "C Hitachi 32HB4W65I 32''", immagine: "assets/img/prodotti/1.jpeg", descrizione: "HD Wi-fi Nero LED Smart tv 32''", categoria: "tv led", prezzo: "200,00", codice: "32HB4W65I"}, {nome: "D Philips 4000 series TV", immagine: "assets/img/prodotti/1.jpeg", descrizione: "LED ultra sottile Full HD", categoria: "tv led", prezzo: "150,00", codice: "24PFS4022/12"}, {nome: "E LG 32LJ51OU 32''", immagine: "assets/img/prodotti/1.jpeg", descrizione: "Nero LED TV", categoria: "tv led", prezzo: "199,00", codice: "32LJ51OU"}]; */

  }

  onCancel(event){

    console.log("clear or cancel")

    //this.searchWord = '';

    this.items = [];

    this.elem = 8;

  }

  getItems(ev) {

    // Reset items back to all of the items
    this.inizializzaElementi();

    // set val to the value of the ev target
    var val = ev.target.value;

    this.searchWord = val;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      this.hide = true;

      this.show = false;

      this.items = this.items.filter((item) => {

        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })

    this.searchSize = this.items.length;

    this.prodotti_ricerca = this.items.slice(0,this.elem);
      

    }else{

      this.hide = false;

      this.show = true;

    }

  }

  doInfinite(infiniteScroll) {
    
    console.log('Begin async operation');

    setTimeout(() => {
      
      for (let i = this.elem; i < this.elem + 8; i++) {

        if(i <= this.items.length){

          this.prodotti_ricerca.push(this.items[i]);

        }

      } 
      
      this.elem = this.elem + 8;

      console.log('Async operation has ended');

      infiniteScroll.complete();
      
    }, 1000); 

  }

schedaProdotto(prodotto: any){

    event.stopPropagation();

     this.navCtrl.push(SchedaProdottoPage, {prodotto: prodotto} );

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

    let popover = this.popoverCtrl.create(PopoverPage, {array: this.items});

    popover.present({
      ev: ev
    });
  }

  goToNext(categorie_liv_2){

    this.navCtrl.push(SottocategoriePage, {categorie_liv_2: categorie_liv_2});

  }

  prezzo_scontato(prezzo, sconto){

    return ((Number(prezzo)*Number(sconto)/100) - Number(prezzo)).toFixed(2);


 }

 iniziliazza_categorie(){

  var smartphone_cellulari : Livello_3 [] = [];

  var informatica : Livello_3 [] = [];

  var video : Livello_3 [] = [];

  var elettrodomestici : Livello_3 [] = [];
  
  var piccoli_elettrodomestici : Livello_3 [] = [];

  var game : Livello_3 [] = [];
  
  /* ***************************************************************************** */

  var smartphone : Livello_3 = {id_liv_3: 0, nome_cat_liv_3: "smartphone", empty: false};

  var iphone : Livello_3 = {id_liv_3: 1, nome_cat_liv_3: "iphone", empty: true};

  var cellulari : Livello_3 = {id_liv_3: 2, nome_cat_liv_3: "cellulari", empty: true};

  /* ***************************************************************************** */    

  var tablet : Livello_3 = {id_liv_3: 0, nome_cat_liv_3: "tablet", empty: false};

  var ipad : Livello_3 = {id_liv_3: 1, nome_cat_liv_3: "ipad", empty: true};

  var accessori_tablet : Livello_3 = {id_liv_3: 2, nome_cat_liv_3: "accessori cellulari", empty: true};

  /* ***************************************************************************** */

  var qled_tv : Livello_3 = {id_liv_3: 0, nome_cat_liv_3: "qled tv", empty: false};

  var ultra_tv : Livello_3 = {id_liv_3: 1, nome_cat_liv_3: "ultra tv", empty: true};

  var smart_tv : Livello_3 = {id_liv_3: 2, nome_cat_liv_3: "smart tv", empty: true};

  /* ***************************************************************************** */

  var lavatrici_carica_frontale : Livello_3 = {id_liv_3: 0, nome_cat_liv_3: "lavatrici carica frontale", empty: false};

  var lavatrici_carica_alto : Livello_3 = {id_liv_3: 1, nome_cat_liv_3: "lavatrici carica alto", empty: true};

  var lavasciuga : Livello_3 = {id_liv_3: 2, nome_cat_liv_3: "lavasciuga", empty: true};

  /* ***************************************************************************** */

  var forni_a_micronde : Livello_3 = {id_liv_3: 0, nome_cat_liv_3: "forni a micronde", empty: false};

  var forni_elettrici : Livello_3 = {id_liv_3: 1, nome_cat_liv_3: "forni elettrici", empty: true};

  var multicooker : Livello_3 = {id_liv_3: 2, nome_cat_liv_3: "multicooker", empty: true};

  /* ***************************************************************************** */

  var giochi_ps4 : Livello_3 = {id_liv_3: 0, nome_cat_liv_3: "giochi ps4", empty: false};

  var accessiori_ps4 : Livello_3 = {id_liv_3: 1, nome_cat_liv_3: "accessiori ps4", empty: true};

  var accessiori_ps3 : Livello_3 = {id_liv_3: 2, nome_cat_liv_3: "accessiori ps3", empty: true};

  // smartphone e cellulari
  smartphone_cellulari.push(smartphone);
  smartphone_cellulari.push(iphone);
  smartphone_cellulari.push(cellulari);

  // tablet
  informatica.push(tablet);
  informatica.push(ipad);
  informatica.push(accessori_tablet);

  // tv
  video.push(qled_tv);
  video.push(ultra_tv);
  video.push(smart_tv);

  // libera installazione
  elettrodomestici.push(lavatrici_carica_frontale);
  elettrodomestici.push(lavatrici_carica_alto);
  elettrodomestici.push(lavasciuga);

  // cottura cibi
  piccoli_elettrodomestici.push(forni_a_micronde);
  piccoli_elettrodomestici.push(forni_elettrici);
  piccoli_elettrodomestici.push(multicooker);

  // playstation
  game.push(giochi_ps4);
  game.push(accessiori_ps4);
  game.push(accessiori_ps3);

  /* ******************************* Livello 2 ******************************* */
  
  var smartphone_e_cellulare : Livello_2 [] = [];
  var accessori_smartphone : Livello_2 [] = [];

  /* ************************************************************************************************************* */
  
  var temp1 : Livello_2 = {id_liv_2 : 0, nome_cat_liv_2:"smartphone e cellulari", categorie_liv_3 : smartphone_cellulari, empty: false};

  var temp12 : Livello_2 = {id_liv_2 : 0, nome_cat_liv_2:"accessori smartphone", categorie_liv_3 : [], empty: true};

  var temp13 : Livello_2 = {id_liv_2 : 0, nome_cat_liv_2:"telefoni domestici", categorie_liv_3 : [], empty: true};

  var temp14 : Livello_2 = {id_liv_2 : 0, nome_cat_liv_2:"wearable", categorie_liv_3 : [], empty: true};

  var temp15 : Livello_2 = {id_liv_2 : 0, nome_cat_liv_2:"tempo libero", categorie_liv_3 : [], empty: true};

  var temp16 : Livello_2 = {id_liv_2 : 0, nome_cat_liv_2:"navigazione gps", categorie_liv_3 : [], empty: true};
  
  smartphone_e_cellulare.push(temp1);

  smartphone_e_cellulare.push(temp12);

  smartphone_e_cellulare.push(temp13);

  smartphone_e_cellulare.push(temp14);

  smartphone_e_cellulare.push(temp15);

  smartphone_e_cellulare.push(temp16);

  /* ************************************************************************************************************* */

  var cat_tablet : Livello_2 [] = [];

  var temp2 : Livello_2 = {id_liv_2 : 1, nome_cat_liv_2:"tablet", categorie_liv_3 : informatica, empty: false};
  
  var temp21 : Livello_2 = {id_liv_2 : 1, nome_cat_liv_2:"e-reader", categorie_liv_3 : [], empty: true};
  
  var temp22 : Livello_2 = {id_liv_2 : 1, nome_cat_liv_2:"computer portatili", categorie_liv_3 : [], empty: true};
  
  var temp23 : Livello_2 = {id_liv_2 : 1, nome_cat_liv_2:"pc desktop e monitor", categorie_liv_3 : [], empty: true};
  
  var temp24 : Livello_2 = {id_liv_2 : 1, nome_cat_liv_2:"stampanti e multifunzione", categorie_liv_3 : [], empty: true};
  
  var temp25 : Livello_2 = {id_liv_2 : 1, nome_cat_liv_2:"networking", categorie_liv_3 : [], empty: true};
  
  var temp26 : Livello_2 = {id_liv_2 : 1, nome_cat_liv_2:"software", categorie_liv_3 : [], empty: true};  

  var temp27 : Livello_2 = {id_liv_2 : 1, nome_cat_liv_2:"accessori", categorie_liv_3 : [], empty: true};  

  cat_tablet.push(temp2);

  cat_tablet.push(temp21);

  cat_tablet.push(temp22);  

  cat_tablet.push(temp23);

  cat_tablet.push(temp24);

  cat_tablet.push(temp25);

  cat_tablet.push(temp26);

  cat_tablet.push(temp27);  
  
  var tv : Livello_2 [] = [];

  var temp3 : Livello_2 = {id_liv_2 : 2, nome_cat_liv_2:"tv", categorie_liv_3 : video, empty: false};

  var temp31 : Livello_2 = {id_liv_2 : 2, nome_cat_liv_2:"decoder", categorie_liv_3 : [], empty: true};
  
  var temp32 : Livello_2 = {id_liv_2 : 2, nome_cat_liv_2:"home audio video", categorie_liv_3 : [], empty: true};

  var temp33 : Livello_2 = {id_liv_2 : 2, nome_cat_liv_2:"dvd e blu-ray", categorie_liv_3 : [], empty: true};

  var temp34 : Livello_2 = {id_liv_2 : 2, nome_cat_liv_2:"hi-fi", categorie_liv_3 : [], empty: true};

  var temp35 : Livello_2 = {id_liv_2 : 2, nome_cat_liv_2:"audio mobile", categorie_liv_3 : [], empty: true};
  
  var temp36 : Livello_2 = {id_liv_2 : 2, nome_cat_liv_2:"fotocamere", categorie_liv_3 : [], empty: true};
  
  var temp37 : Livello_2 = {id_liv_2 : 2, nome_cat_liv_2:"videocamere", categorie_liv_3 : [], empty: true};  

  tv.push(temp3);

  tv.push(temp31);

  tv.push(temp32);

  tv.push(temp33);

  tv.push(temp34);

  tv.push(temp35);

  tv.push(temp36);

  tv.push(temp37);

  var libera_installazione : Livello_2 [] = [];

  var temp4 : Livello_2 = {id_liv_2 : 3, nome_cat_liv_2:"libera installazione", categorie_liv_3 : elettrodomestici, empty: false};

  var temp41 : Livello_2 = {id_liv_2 : 3, nome_cat_liv_2:"incasso", categorie_liv_3 : [], empty: true};

  var temp42 : Livello_2 = {id_liv_2 : 3, nome_cat_liv_2:"condizionatori", categorie_liv_3 : [], empty: true};

  var temp43 : Livello_2 = {id_liv_2 : 3, nome_cat_liv_2:"riscaldamento", categorie_liv_3 : [], empty: true};

  var temp44 : Livello_2 = {id_liv_2 : 3, nome_cat_liv_2:"trattamento aria", categorie_liv_3 : [], empty: true};

  var temp45 : Livello_2 = {id_liv_2 : 3, nome_cat_liv_2:"ventilatori", categorie_liv_3 : [], empty: true};
  
  libera_installazione.push(temp4);

  libera_installazione.push(temp41);

  libera_installazione.push(temp42);

  libera_installazione.push(temp43);
  
  libera_installazione.push(temp44);
  
  libera_installazione.push(temp45);   

  var cottura_cibi : Livello_2 [] = [];

  var temp5 : Livello_2 = {id_liv_2 : 8, nome_cat_liv_2:"cottura cibi", categorie_liv_3 : piccoli_elettrodomestici, empty: false};
  
  var temp51 : Livello_2 = {id_liv_2 : 8, nome_cat_liv_2:"preparazione cibi", categorie_liv_3 : [], empty: true};
  
  var temp52 : Livello_2 = {id_liv_2 : 8, nome_cat_liv_2:"cura della persona", categorie_liv_3 : [], empty: true};

  var temp53 : Livello_2 = {id_liv_2 : 8, nome_cat_liv_2:"pulizia della casa", categorie_liv_3 : [], empty: true};
  
  var temp54 : Livello_2 = {id_liv_2 : 8, nome_cat_liv_2:"caffè e colazione", categorie_liv_3 : [], empty: true};

  var temp55 : Livello_2 = {id_liv_2 : 8, nome_cat_liv_2:"stiro e cucito", categorie_liv_3 : [], empty: true};

  var temp56 : Livello_2 = {id_liv_2 : 8, nome_cat_liv_2:"acqua", categorie_liv_3 : [], empty: true};

  cottura_cibi.push(temp5);

  cottura_cibi.push(temp51);

  cottura_cibi.push(temp52);

  cottura_cibi.push(temp53);

  cottura_cibi.push(temp54);
  
  cottura_cibi.push(temp55);
  
  cottura_cibi.push(temp56);  
  
  var playstation : Livello_2 [] = [];

  var temp6 : Livello_2 = {id_liv_2 : 5, nome_cat_liv_2:"playstation", categorie_liv_3 : game, empty: false};

  var temp61 : Livello_2 = {id_liv_2 : 5, nome_cat_liv_2:"xbox", categorie_liv_3 : [], empty: true};

  var temp62 : Livello_2 = {id_liv_2 : 5, nome_cat_liv_2:"nintendo", categorie_liv_3 : [], empty: true};
  
  var temp63 : Livello_2 = {id_liv_2 : 5, nome_cat_liv_2:"informatica per game", categorie_liv_3 : [], empty: true};

  playstation.push(temp6);

  playstation.push(temp61);

  playstation.push(temp62);
  
  playstation.push(temp63);  

  /* ******************************* Livello 3 ******************************* */

  var telefonia_e_navigazione : Livello_1 = {id_liv_1 : 0, icona: "assets/img/smartphone.png", nome_cat_liv_1 : "Telefonia e Navigazione", categorie_liv_2 : smartphone_e_cellulare, empty: false, color:"#ff6e1a"};
  
  var info : Livello_1 = {id_liv_1 :1, icona: "assets/img/tablet.png", nome_cat_liv_1 : "Informatica", categorie_liv_2 : cat_tablet, empty: false, color:"#ff7e33"};

  var audio_video : Livello_1 = {id_liv_1 :1, icona: "assets/img/television.png", nome_cat_liv_1 : "Audio, Video e Fotografia", categorie_liv_2 : tv, empty: false, color:"#ff8e4d"};

  var elettrodomestici_e_climatizzazione : Livello_1 = {id_liv_1 :1, icona: "assets/img/clima.png", nome_cat_liv_1 : "Elettrodomestici e Climatizzazione", categorie_liv_2 : libera_installazione, empty: false, color:"#ff9e66"};
  
  var p_elettrodomestici : Livello_1 = {id_liv_1 :1, icona: "assets/img/iron.png", nome_cat_liv_1 : "Piccoli Elettrodomestici", categorie_liv_2 : cottura_cibi, empty: false, color:"#ffae88"};

  var giochi : Livello_1 = {id_liv_1 :1, icona: "assets/img/console.png", nome_cat_liv_1 : "Game", categorie_liv_2 : playstation, empty: false, color:"#ffbe99"};

  this.categorie.push(telefonia_e_navigazione);

  this.categorie.push(info);

  this.categorie.push(audio_video);

  this.categorie.push(elettrodomestici_e_climatizzazione);

  this.categorie.push(p_elettrodomestici);

  this.categorie.push(giochi);
 
}

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

  console.log("volantino: "+JSON.stringify(this.shared.getVolantino()[index]));

} */

closeKeyboard(){

  this.keyboard.close();

  this.elem = 8;

 // this.searchWord = '';

    /* this.items = [];

     */

 }

 addToCompare(item, index){

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

confronta(){

  if(this.shared.getCountSelectedItem() >= 2 && this.shared.getCountSelectedItem() <= 4){

    this.navCtrl.push(ConfrontoPage, {cat : this.cat});

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

}

