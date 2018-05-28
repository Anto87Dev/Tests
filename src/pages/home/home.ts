import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Prodotti } from '../../model/prodotti';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
 } from '@ionic-native/google-maps';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SharedProvider } from '../../providers/shared/shared';
import { Livello_3 } from '../../model/livello_3';
import { Livello_2 } from '../../model/livello_2';
import { Livello_1 } from '../../model/livello_1';
import { SchedaProdottoPage } from '../scheda-prodotto/scheda-prodotto';
import { ConfrontoPage } from '../confronto/confronto';
import { Keyboard } from '@ionic-native/keyboard';
import { CatLiv3Page } from '../cat-liv3/cat-liv3';
import { ProdottiPage } from '../prodotti/prodotti';
import { SottocategoriePage } from '../sottocategorie/sottocategorie';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchWord : String = "-";

  searchSize : number = 0;

  array_prod: any[] = [];

  cat0: String;

  array_prod_1: any[] = [];

  cat1: String;

  array_prod_2: any[] = [];

  cat2: String;

  array_prod_3: any[] = [];

  cat3: String;

  array_prod_4: any[] = [];

  cat4: String;

  array_prod_5: any[] = [];

  cat5: String;

  latitudine: number = 0.0;
  
  longitudine: number = 0.0;

  map: GoogleMap;

  distanza: number = 0.0;

  pti_vendita: any;

  punto_vendita_vicino: any;

  banner: any[] = [];

  hide = false;

  show = true;

  items: any[]= [];

  cat: string = '';

  arr_compare: any[] = [];

  arr_wishlist: any[] = [];

  prodotti_ricerca: any[] = [];

  elem: number = 4;

  playstation : Livello_2 [] = [];

  categorie : Livello_1 [] = [];

  giochi : Livello_1;

  telefonia_e_navigazione : Livello_1;

  info : Livello_1;

  audio_video : Livello_1;

  elettrodomestici_e_climatizzazione : Livello_1;

  p_elettrodomestici : Livello_1;

  constructor(private keyboard: Keyboard, private screen: ScreenOrientation, private toast: ToastController, private shared : SharedProvider, private googleMaps: GoogleMaps, private geolocalizzazione: Geolocation, private accuracy : LocationAccuracy, public navCtrl: NavController) {

    this.punto_vendita_vicino = [{distanza : "--", lat: "--", lng:"--", nome: "--", indirizzo: "--", citta: "--", cap: "--", provincia: "--", recapito: "--", email: "--"}];

    this.pti_vendita = [    
      
      {distanza : "--", lat: "40.695786", lng:"14.482843", nome: "Expert Megastore Castellammare di Stabia", indirizzo: "Via Don Minzoni, 187/A", citta: "Castellammare di Stabia", cap: "80053", provincia: "NA", recapito: "081-8018481", email: "castellammare.info@grupposomma.com"}, 
      {distanza : "--", lat: "40.700695", lng:"14.489909", nome: "Expert Store Castellammare di Stabia", indirizzo: "Via Cosenza, 149", citta: "Castellammare di Stabia", cap: "80053", provincia: "NA", recapito: "081-8711326", email: "castellammare.info@grupposomma.com"}, 
      {distanza : "--", lat: "40.748749", lng:"14.599282", nome: "Expert Megastore Pagani C/C Pegaso", indirizzo: "Via Alcide de Gasperi, 340", citta: "Pagani", cap: "84016", provincia: "NA", recapito: "081-5150292", email: "pagani.info@grupposomma.com"}, 
      {distanza : "--", lat: "40.738277", lng:"14.667514", nome: "Expert Megastore Nocera Superiore C/C Nuceria", indirizzo: "Via Petraro Pucciani", citta: "Nocera Superiore", cap: "84015", provincia: "NA", recapito: "081-18907533", email: "nocera.info@grupposomma.com"}, 
      {distanza : "--", lat: "40.784980", lng:"14.378306", nome: "Expert Megastore Torre del Greco", indirizzo: "Via Cavallo 7", citta: "Torre Del Greco", cap: "80059", provincia: "NA", recapito: "081-19483790", email: "torredelgreco.info@grupposomma.com"}
    
    ];

    this.banner = [{immagine: "assets/img/pub/1.jpg"}, {immagine: "assets/img/pub/2.jpg"}, {immagine: "assets/img/pub/3.jpg"}];

    this.caricaMappa();

    this.iniziliazza_categorie();

    this.inizializzaElementi();

    this.inizializzaRicerca();

  }

  /* ionViewDidEnter(){

    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT); 

  } */

  ionViewCanEnter(){

    this.caricaMappa();
    
    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT); 

  }

  inizializzaRicerca(){

    this.items = [];

    this.items = this.items.concat(this.shared.getVolantino()["smartphone"]);

    this.items = this.items.concat(this.shared.getVolantino()["tablet"]);

    this.items = this.items.concat(this.shared.getVolantino()["qled tv"]);
    
    this.items = this.items.concat(this.shared.getVolantino()["lavatrici carica frontale"]);    

    this.items = this.items.concat(this.shared.getVolantino()["forni a micronde"]);

    this.items = this.items.concat(this.shared.getVolantino()["giochi ps4"]);

  }

  inizializzaElementi(){

    var prod1 : Prodotti = new Prodotti("SAMSUNG GALAXY J3 2016 8GB SM-J320 oro", "assets/img/prodotti/smartphone/SMW8D070.jpg", "-", "Smartphone", 13.4 ,129.00, "SMJ320FZDN", false, false, "-", "-", "-", "-", "-", "-", "-", "-", true); 

    var prod2 : Prodotti = new Prodotti("HUAWEI P20 blu", "assets/img/prodotti/smartphone/202737.jpg", "-", "Smartphone", 0 ,679.90, "P20BLUE", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod3 : Prodotti = new Prodotti("SAMSUNG GALAXY S9 SM-G960 blu", "assets/img/prodotti/smartphone/202493.jpg", "-", "Smartphone", 0 ,899.00, "SMG960FZBD", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 
   
    var arr: Prodotti [] = [];

    arr.push(prod1);

    arr.push(prod2);

    arr.push(prod3);

    this.array_prod_1.push(prod1);

    this.array_prod_1.push(prod2);

    this.array_prod_1.push(prod3);

    this.cat0 = "smartphone";

    this.shared.setVolantino("smartphone", arr);

    var prod4 : Prodotti = new Prodotti("SAMSUNG GALAXY TAB S2 2016 LTE SM-T819 nero", "assets/img/prodotti/tablet/SMO9D023.jpg", "-", "Tablet", 0, 451.00, "SMT819NZK", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod5 : Prodotti = new Prodotti("ASUS ZENPAD 3 8.0 Z581KL-1A008A nero", "assets/img/prodotti/tablet/51O9D042.jpg", "-", "Tablet", 0, 259.90, "Z581KL1A008A", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod6 : Prodotti = new Prodotti("HUAWEI M5 10 LTE grigio", "assets/img/prodotti/tablet/202508.jpg", "-", "Tablet", 0, 449.90, "MEDIAPADM5100LTESPACEGRAY", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 
   
    arr = [];
    
    arr.push(prod4);

    arr.push(prod5);

    arr.push(prod6);

    this.array_prod_2.push(prod4);

    this.array_prod_2.push(prod5);

    this.array_prod_2.push(prod6);

    this.cat1 = "tablet";

    this.shared.setVolantino("tablet", arr);

    var prod7 : Prodotti = new Prodotti("SAMSUNG QE55Q8CN", "assets/img/prodotti/qled_tv/203059.jpg", "-", "Qled Tv", 0, 2.499, "QE55Q8CN", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod8 : Prodotti = new Prodotti("SAMSUNG QE55Q7FN", "assets/img/prodotti/qled_tv/203033.jpg", "-", "Qled Tv", 0, 2.199, "QE55Q7FN", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod9 : Prodotti = new Prodotti("SAMSUNG QE65Q7F", "assets/img/prodotti/qled_tv/SMNMG067.jpg", "-", "Qled Tv", 0, 2.099, "QE65Q7F", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 
   
    arr = [];
    
    arr.push(prod7);

    arr.push(prod8);

    arr.push(prod9);

    this.array_prod_3.push(prod7);

    this.array_prod_3.push(prod8);

    this.array_prod_3.push(prod9);

    this.cat2 = "qled tv";

    this.shared.setVolantino("qled tv", arr);

    var prod10 : Prodotti = new Prodotti("SAMSUNG WW80M740NOA/ET", "assets/img/prodotti/lavatrici_carico_frontale/202502.jpg", "-", "Lavatrici Carica Frontale", 0, 1.199, "WW80M740NOA", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod11 : Prodotti = new Prodotti("BOSCH WAN20067IT", "assets/img/prodotti/lavatrici_carico_frontale/BOEB4014.jpg", "-", "Lavatrici Carica Frontale", 25.1, 399.00, "WAN20067IT", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod12 : Prodotti = new Prodotti("SAMSUNG WW80K5210UW", "assets/img/prodotti/lavatrici_carico_frontale/203095.jpg", "-", "Lavatrici Carica Frontale", 0, 599.00, "WW80K5210UW", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 
   
    arr = [];
    
    arr.push(prod10);

    arr.push(prod11);

    arr.push(prod12);

    this.array_prod_4.push(prod10);

    this.array_prod_4.push(prod11);

    this.array_prod_4.push(prod12);

    this.cat3 = "lavatrici carica frontale";

    this.shared.setVolantino("lavatrici carica frontale", arr);

    var prod13 : Prodotti = new Prodotti("WHIRLPOOL MWP3391SX", "assets/img/prodotti/forni_a_micronde/202546.jpg", "-", "Forni a Micronde", 0, 439.00, "MWP3391SX", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod14 : Prodotti = new Prodotti("SAMSUNG MG23F301ECW", "assets/img/prodotti/forni_a_micronde/SMSLF005.jpg", "-", "Forni a Micronde", 0, 129.90, "MG23F301ECW", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod15 : Prodotti = new Prodotti("SEKOM SM820C7HS", "assets/img/prodotti/forni_a_micronde/SOSLF006.jpg", "-", "Forni a Micronde", 0, 79.00, "SM820C7HS", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 
   
    arr = [];
    
    arr.push(prod13);

    arr.push(prod14);

    arr.push(prod15);

    this.array_prod_5.push(prod13);

    this.array_prod_5.push(prod14);

    this.array_prod_5.push(prod15);

    this.cat4 = "Forni a Micronde";

    this.shared.setVolantino("forni a micronde", arr);

    var prod16 : Prodotti = new Prodotti("SONY PS4 THE LAST OF US REMASTERED 9407119", "assets/img/prodotti/giochi_ps4/SO0AI008.jpg", "-", "Giochi Playstation 4", 0, 40.90, "9407119", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod17 : Prodotti = new Prodotti("UBISOFT PS4 ASSASSIN'S CREED ORIGINS 300095034", "assets/img/prodotti/giochi_ps4/UT0AI006.jpg", "-", "Giochi Playstation 4", 0, 59.90, "300095034", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 

    var prod18 : Prodotti = new Prodotti("ELECTRONIC ARTS PS4 FIFA 18 1034481", "assets/img/prodotti/giochi_ps4/EA0AI009.jpg", "-", "Giochi Playstation 4", 0, 69.90, "1034481", false, false, "-", "-", "-", "-", "-", "-", "-", "-", false); 
   
    arr = [];
    
    arr.push(prod16);

    arr.push(prod17);

    arr.push(prod18);

    this.array_prod.push(prod16);

    this.array_prod.push(prod17);

    this.array_prod.push(prod18);

    this.cat5 = "giochi ps4";

    this.shared.setVolantino("giochi ps4", arr);

    //this.items = this.shared.getVolantino();  

  }


  doInfinite(infiniteScroll) {
    
    console.log('Begin async operation');

    setTimeout(() => {
      
      for (let i = this.elem; i < this.elem + 4; i++) {

        if(i <= this.items.length){

          this.prodotti_ricerca.push(this.items[i]);

        }

      } 
      
      this.elem = this.elem + 4;

      console.log('Async operation has ended');

      infiniteScroll.complete();
      
    }, 1000); 

  }

  caricaMappa(){

    this.accuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.accuracy.request(this.accuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });

    let options = {

      enableHighAccuracy: true

    }
    
    let watch = this.geolocalizzazione.watchPosition(options);

    watch.subscribe((posizione) => {
      
      this.latitudine = posizione.coords.latitude;

      this.longitudine = posizione.coords.longitude;

      /* console.log("lat - lng: "+this.latitudine+" - "+this.longitudine); */

      for(let i=0; i< this.pti_vendita.length; i++){

        this.pti_vendita[i].distanza = this.distance(this.pti_vendita[i].lat, this.pti_vendita[i].lng, "k");
  
      };

      this.pti_vendita.sort((a, b) => a.distanza < b.distanza ? -1 : a.distanza > b.distanza ? 1 : 0);
      
      this.punto_vendita_vicino = this.pti_vendita[0];

      /* console.log(JSON.stringify(this.punto_vendita_vicino)); */

      /* let opzioni: GoogleMapOptions = {

        camera: {

          target: {

            lat: posizione.coords.latitude,

            lng: posizione.coords.longitude

          },

          zoom: 9,

          tilt: 30

        }, controls: {
    
          myLocationButton : true,
          
          compass: false
      
        }

      }; */

      /* this.map = this.googleMaps.create('map', opzioni);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

        console.log("La mappa è stata caricata correttamente");

        //Ora è possibile utilizzare tutti i metodi in sicurezza
        this.map.addMarker({
          title: 'Ionic',
          icon: '',
          animation: 'DROP',
          position: {
            lat: posizione.coords.latitude,
            lng: posizione.coords.longitude
          }
        })
        .then(marker => {
          /* marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert('clicked');
            }); 

            var icon =  {
           
              url: "assets/img/marker2.png"

          }

            marker.setIcon(icon)

          });

    }); */

    });
      
  }


  distance(lat2 : any, lon2 : any, unit : any) {
    var radlat1 = Math.PI * this.latitudine/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = this.longitudine-lon2; 
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    dist = Math.round(dist * 100) / 100;
    return dist
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
  
    var temp5 : Livello_2 = {id_liv_2 : 4, nome_cat_liv_2:"cottura cibi", categorie_liv_3 : piccoli_elettrodomestici, empty: false};
    
    var temp51 : Livello_2 = {id_liv_2 : 4, nome_cat_liv_2:"preparazione cibi", categorie_liv_3 : [], empty: true};
    
    var temp52 : Livello_2 = {id_liv_2 : 4, nome_cat_liv_2:"cura della persona", categorie_liv_3 : [], empty: true};
  
    var temp53 : Livello_2 = {id_liv_2 : 4, nome_cat_liv_2:"pulizia della casa", categorie_liv_3 : [], empty: true};
    
    var temp54 : Livello_2 = {id_liv_2 : 4, nome_cat_liv_2:"caffè e colazione", categorie_liv_3 : [], empty: true};
  
    var temp55 : Livello_2 = {id_liv_2 : 4, nome_cat_liv_2:"stiro e cucito", categorie_liv_3 : [], empty: true};
  
    var temp56 : Livello_2 = {id_liv_2 : 4, nome_cat_liv_2:"acqua", categorie_liv_3 : [], empty: true};
  
    cottura_cibi.push(temp5);
  
    cottura_cibi.push(temp51);
  
    cottura_cibi.push(temp52);
  
    cottura_cibi.push(temp53);
  
    cottura_cibi.push(temp54);
    
    cottura_cibi.push(temp55);
    
    cottura_cibi.push(temp56);  
      
    var temp6 : Livello_2 = {id_liv_2 : 5, nome_cat_liv_2:"playstation", categorie_liv_3 : game, empty: false};
  
    var temp61 : Livello_2 = {id_liv_2 : 5, nome_cat_liv_2:"xbox", categorie_liv_3 : [], empty: true};
  
    var temp62 : Livello_2 = {id_liv_2 : 5, nome_cat_liv_2:"nintendo", categorie_liv_3 : [], empty: true};
    
    var temp63 : Livello_2 = {id_liv_2 : 5, nome_cat_liv_2:"informatica per game", categorie_liv_3 : [], empty: true};
  
    this.playstation.push(temp6);
  
    this.playstation.push(temp61);
  
    this.playstation.push(temp62);
    
    this.playstation.push(temp63);  
  
    /* ******************************* Livello 3 ******************************* */
  
    this.telefonia_e_navigazione = {id_liv_1 : 0, icona: "assets/img/smartphone.png", nome_cat_liv_1 : "Telefonia e Navigazione", categorie_liv_2 : smartphone_e_cellulare, empty: false, color:"#ff6e1a"};
    
    this.info = {id_liv_1 :1, icona: "assets/img/tablet.png", nome_cat_liv_1 : "Informatica", categorie_liv_2 : cat_tablet, empty: false, color:"#ff7e33"};
  
    this.audio_video = {id_liv_1 :1, icona: "assets/img/television.png", nome_cat_liv_1 : "Audio, Video e Fotografia", categorie_liv_2 : tv, empty: false, color:"#ff8e4d"};
  
    this.elettrodomestici_e_climatizzazione = {id_liv_1 :1, icona: "assets/img/clima.png", nome_cat_liv_1 : "Elettrodomestici e Climatizzazione", categorie_liv_2 : libera_installazione, empty: false, color:"#ff9e66"};
    
    this.p_elettrodomestici = {id_liv_1 :1, icona: "assets/img/iron.png", nome_cat_liv_1 : "Piccoli Elettrodomestici", categorie_liv_2 : cottura_cibi, empty: false, color:"#ffae88"};
  
    this.giochi = {id_liv_1 :1, icona: "assets/img/console.png", nome_cat_liv_1 : "Game", categorie_liv_2 : this.playstation, empty: false, color:"#ffbe99"};
  
    this.categorie.push(this.telefonia_e_navigazione);
  
    this.categorie.push(this.info);
  
    this.categorie.push(this.audio_video);
  
    this.categorie.push(this.elettrodomestici_e_climatizzazione);
  
    this.categorie.push(this.p_elettrodomestici);
  
    this.categorie.push(this.giochi);
   
  }

  toProdotti(nome_cat: String){

    nome_cat = nome_cat.toLowerCase();

    console.log("nome_cat: "+nome_cat);

    this.navCtrl.push(ProdottiPage, {nome_cat: nome_cat});
    

  }

  schedaProdotto(prodotto: any){

    event.stopPropagation();

     this.navCtrl.push(SchedaProdottoPage, {prodotto: prodotto} );

  }

  prezzo_scontato(prezzo, sconto){

    return ((Number(prezzo.toFixed(2)) - (Number(prezzo)*Number(sconto)/100))).toFixed(2);


 }

 closeKeyboard(){

  this.keyboard.close();

  this.elem = 4;

 }

 onCancel(event){

  this.searchWord = '';

  this.items = [];

  this.elem = 4;
  
}

 getItems(ev) {


  // Reset items back to all of the items
  this.inizializzaRicerca();

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

 //   console.log("this.items.slice", JSON.stringify(this.items));

    this.searchSize = this.items.length;

    this.prodotti_ricerca = this.items.slice(0,this.elem);
    //this.test = this.items;

  }else{

    this.hide = false;

    this.show = true;

  }

}

goToNext(sottocategoria){

  event.stopPropagation();



  console.log("giochi:", JSON.stringify(this.giochi.categorie_liv_2));

  //this.navCtrl.push(CatLiv3Page, {index: this.playstation[0]});
  this.navCtrl.push(SottocategoriePage, {categorie_liv_2: sottocategoria});
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
