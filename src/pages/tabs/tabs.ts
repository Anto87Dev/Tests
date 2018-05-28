import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PuntiVenditaPage } from '../punti-vendita/punti-vendita';
import { CatalogoPage } from '../catalogo/catalogo';
import { WishlistPage } from '../wishlist/wishlist';
import { VolantinoPage } from '../volantino/volantino';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PuntiVenditaPage;
  tab3Root = VolantinoPage;
  tab4Root = WishlistPage;
  tab5Root = CatalogoPage;


  constructor() {

  }

}
