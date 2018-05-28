import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PuntiVenditaPage } from '../pages/punti-vendita/punti-vendita';
import { VolantinoPage ,PopoverPage } from '../pages/volantino/volantino';
import { WishlistPage, PopoverPage2 } from '../pages/wishlist/wishlist';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps'
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { SchedaPuntoVenditaPage } from '../pages/scheda-punto-vendita/scheda-punto-vendita';
import { EmailComposer } from '@ionic-native/email-composer';
import { SharedProvider } from '../providers/shared/shared';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HTTP } from '@ionic-native/http';
import { SchedaProdottoPage } from '../pages/scheda-prodotto/scheda-prodotto';
import { ConfrontoPage } from '../pages/confronto/confronto';
import { ListaNozzePage } from '../pages/lista-nozze/lista-nozze';
import { QuotePage } from '../pages/quote/quote';
import { SottocategoriePage } from '../pages/sottocategorie/sottocategorie';
import { ProdottiPage } from '../pages/prodotti/prodotti';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; 
import { DragulaModule } from 'ng2-dragula';
import { CatLiv3Page } from '../pages/cat-liv3/cat-liv3';
import { CatalogoPage } from '../pages/catalogo/catalogo';
import { Keyboard } from '@ionic-native/keyboard';
import { AboutPage } from '../pages/about/about';
import { ServiziPage} from '../pages/servizi/servizi';
import { ServiziModalPage } from '../pages/servizi-modal/servizi-modal';
import { ContattiPage } from '../pages/contatti/contatti';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PuntiVenditaPage,
    VolantinoPage,
    WishlistPage,
    TabsPage,
    SchedaPuntoVenditaPage,
    SchedaProdottoPage,
    ServiziPage,
    ConfrontoPage,
    ListaNozzePage,
    AboutPage,
    QuotePage,
    SottocategoriePage,
    ProdottiPage,
    ServiziModalPage,
    PopoverPage,
    PopoverPage2,
    ContattiPage,
    CatLiv3Page,
    CatalogoPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PuntiVenditaPage,
    VolantinoPage,
    WishlistPage,
    AboutPage,
    TabsPage,
    ServiziPage,
    ContattiPage,
    SchedaPuntoVenditaPage,
    SchedaProdottoPage,
    ConfrontoPage,
    ListaNozzePage,
    ServiziModalPage,
    QuotePage,
    SottocategoriePage,
    ProdottiPage,
    PopoverPage,
    PopoverPage2,
    CatLiv3Page,
    CatalogoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    NativeStorage,
    CallNumber,
    EmailComposer,
    LocationAccuracy,
    SocialSharing,
    GoogleMaps,
    Geolocation,
    SharedProvider,
    ScreenOrientation,
    Keyboard,
    HTTP ,
    BarcodeScanner, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
