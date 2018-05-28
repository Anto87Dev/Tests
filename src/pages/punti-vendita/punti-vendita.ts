import { Component, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  HtmlInfoWindow
 } from '@ionic-native/google-maps';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NativeStorage } from '@ionic-native/native-storage';
import { SchedaPuntoVenditaPage } from '../scheda-punto-vendita/scheda-punto-vendita';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
 
@Component({
  selector: 'page-punti-vendita',
  templateUrl: 'punti-vendita.html'
})
export class PuntiVenditaPage {

  map: GoogleMap;

  icona: string = "md-pin";

  lista: boolean = false;

  mappa: boolean = true;

  latitudine: number = 0.0;
  
  longitudine: number = 0.0;

  items: any;

  overlayHidden: boolean = false;

  constructor(private screen: ScreenOrientation, private renderer : Renderer, private storage: NativeStorage, private accuracy : LocationAccuracy, private call : CallNumber, private launch: LaunchNavigator, private googleMaps: GoogleMaps, public navCtrl: NavController, private geolocalizzazione: Geolocation) {

    this.items = [
      
      {distanza : "--", lat: "40.695786", lng:"14.482843", nome: "Expert Megastore Castellammare di Stabia", indirizzo: "Via Don Minzoni, 187/A", citta: "Castellammare di Stabia", cap: "80053", provincia: "NA", recapito: "081-8018481", email: "castellammare.info@grupposomma.com"}, 
      {distanza : "--", lat: "40.700695", lng:"14.489909", nome: "Expert Store Castellammare di Stabia", indirizzo: "Via Cosenza, 149", citta: "Castellammare di Stabia", cap: "80053", provincia: "NA", recapito: "081-8711326", email: "castellammare.info@grupposomma.com"}, 
      {distanza : "--", lat: "40.748749", lng:"14.599282", nome: "Expert Megastore Pagani C/C Pegaso", indirizzo: "Via Alcide de Gasperi, 340", citta: "Pagani", cap: "84016", provincia: "NA", recapito: "081-5150292", email: "pagani.info@grupposomma.com"}, 
      {distanza : "--", lat: "40.738277", lng:"14.667514", nome: "Expert Megastore Nocera Superiore C/C Nuceria", indirizzo: "Via Petraro Pucciani", citta: "Nocera Superiore", cap: "84015", provincia: "NA", recapito: "081-18907533", email: "nocera.info@grupposomma.com"}, 
      {distanza : "--", lat: "40.784980", lng:"14.378306", nome: "Expert Megastore Torre del Greco", indirizzo: "Via Cavallo 7", citta: "Torre Del Greco", cap: "80059", provincia: "NA", recapito: "081-19483790", email: "torredelgreco.info@grupposomma.com"}
    
    ];

    

  }

  ionViewDidEnter(){

      this.caricaMappa();

      this.storage.getItem('tutorial').then(data => {
        
        this.overlayHidden = data;

      },

      (error) => {
      
        this.storage.setItem("tutorial", false);

        console.error(error);
      
      }
      
    );

    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);

    }

    hide(){

      this.overlayHidden = true;

      this.storage.setItem("tutorial", true);

    }

  cambiaVista(){

    if(!this.lista){

      this.mappa = false;

      this.lista = true;

      this.icona = "md-list";

      this.storage.getItem('tutorial')
      .then(data => {
        
        this.overlayHidden = data;

      },

      (error) => {
      
        
        console.error(error);
      
      }
      
    );


    }else{

      this.mappa = true;

      this.lista = false;

      this.icona = "md-pin";

    }


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

      console.log("pnt-lat - pnt-lng: "+this.latitudine+" - "+this.longitudine);

       //Calcolo distanze ordinamento array per punti vendita piu' vicini

       for(let i=0; i< this.items.length; i++){

        this.items[i].distanza = this.distance(this.items[i].lat, this.items[i].lng, "k");
  
      };

      this.items.sort((a, b) => a.distanza < b.distanza ? -1 : a.distanza > b.distanza ? 1 : 0);

      /* ************************************************************************************* */
      
      let opzioni: GoogleMapOptions = {

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

      };

      this.map = this.googleMaps.create('map', opzioni);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

        console.log("La mappa è stata caricata correttamente");

        //Ora è possibile utilizzare tutti i metodi in sicurezza

        for(let item of this.items){
  
      //var htmlInfoWindow = new HtmlInfoWindow();

     // htmlInfoWindow.setContent(infoWindowContent);

     /*  htmlInfoWindow. */

          this.map.addMarker({
            title: item.nome,    
            icon: '',
            animation: 'DROP',
            position: {
              lat: item.lat,
              lng: item.lng
            }
          })
          .then(marker => {
            
           /*  marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                
                //this.scheda(item, 0);
                htmlInfoWindow.open(marker);

              }); */
  
              marker.on(GoogleMapsEvent.INFO_CLICK)
              .subscribe(() => {
                
               this.scheda(item, 0);
    
              });

              var icon =  {
             
                url: "assets/img/marker2.png"
  
            }
  
              marker.setIcon(icon);
  
            });

        }

    });

    });

    /* this.geolocalizzazione.getCurrentPosition().then((posizione) => {

      this.latitudine = posizione.coords.latitude;

      this.longitudine = posizione.coords.longitude;

      console.log("lat - lng: "+this.latitudine+" - "+this.longitudine);

      let opzioni: GoogleMapOptions = {

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

      };

      this.map = this.googleMaps.create('map', opzioni);

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

    });


    }).catch((errore) => {



    }); */
      
  }

  chiama(numero: string){

    this.call.callNumber(numero, true).then(() => 
    {

      console.log("Chiamata in corso...");

    }).catch(() => {

      console.log("Errore chiamata!");
      
    });

    
  }

  indicazioni(indirizzo: string){

   /*  let toast = this.toastCtrl.create({
      message: 'Indicazioni',
      duration: 3000,
      position: 'top'
    });

    toast.present(); */
    console.log("lat2 - lng2: "+this.latitudine+" - "+this.longitudine);
    this.launch.navigate(indirizzo, {
      start: [this.latitudine, this.longitudine]
  });

  }

  showHide(index){

    var button = <HTMLElement>document.getElementById('button_'+String(index));

    var item = <HTMLElement>document.getElementById('item_'+String(index));

    var cDiv = item.children;
        
    var div = <HTMLElement>cDiv[1];
    
    var style = window.getComputedStyle(button);

    if(style.getPropertyValue("min-height") == "0px"){

      div.style.borderBottom = "0px solid #ea5b0c";

      this.renderer.setElementStyle(button, "min-height", "55px");

    }else{

      this.renderer.setElementStyle(button, "min-height", "0px");
      
      div.style.borderBottom = "2px solid #ea5b0c";
      
    }


  }
  
  scheda(item, i){

    this.navCtrl.push(SchedaPuntoVenditaPage, {item: item, index: i}); 

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

}
