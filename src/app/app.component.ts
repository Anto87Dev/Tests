import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';
import { ListaNozzePage } from '../pages/lista-nozze/lista-nozze';
import { CatalogoPage } from '../pages/catalogo/catalogo';
import { AboutPage } from '../pages/about/about';
import { ServiziPage } from '../pages/servizi/servizi';
import { ContattiPage } from '../pages/contatti/contatti';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{image: string, title: string, component: any}>;

  constructor(public storage: NativeStorage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    
    this.inizializzaApp();

    this.pages = [
      { image: 'md-people', title: 'Chi siamo', component: AboutPage },
      { image: 'md-list', title: 'Catalogo', component: CatalogoPage },
      { image: 'md-heart', title: 'Lista nozze', component: ListaNozzePage },
      { image: 'md-information-circle', title: 'Servizi', component: ServiziPage },
      { image: 'md-mail', title: 'Contatti', component: ContattiPage }   
      
    ];

  }

  inizializzaApp(){

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ea5b0c');
      this.splashScreen.hide();
      

    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
/* 
    if(page.component == LoginPage){

      this.login.logOut().subscribe(data => {

        if(data.codice_risposta == 1){

          this.storage.set('isLogged', "0");

        }else{

          this.storage.set('isLogged', "0");

        }

      }, error => {
            
        console.log(error);// Error getting the data

      });

      

    } */
  
    this.nav.push(page.component);
  
  }

}

