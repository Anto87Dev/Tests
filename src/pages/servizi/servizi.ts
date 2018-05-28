import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { Servizi } from '../../model/servizi';
import { ServiziModalPage } from '../servizi-modal/servizi-modal';

/**
 * Generated class for the ServiziPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servizi',
  templateUrl: 'servizi.html',
})
export class ServiziPage {

  garanzia : Servizi;

  finanziamenti : Servizi;

  consegna : Servizi;

  ritiro : Servizi;

  lista_nozze : Servizi;

  preventivi : Servizi;

  abbonamenti : Servizi;

  vendita : Servizi;

  wifi : Servizi;

  parcheggio : Servizi;

  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  
    var string_este = "<span id=\"lblContenutoGaranzia\"><p><em>Tutti i prodotti venduti dalla Casa produttrice sono coperti dalla garanzia del venditore per un periodo di 2 anni dalla data di acquisto, come previsto dalle normative europee (garanzia legale).&nbsp;<br> <br> Ma con il servizio&nbsp;<em><strong>EXTRA GARANZIA EXPERT SOMMA</strong></em>&nbsp;si avranno&nbsp;<br> <strong>5 ANNI di GARANZIA</strong>, cioè&nbsp;<em><strong>5 ANNI DI TRANQUILLITA'</strong></em>.<br> Cioè alla garanzia convenzionale del venditore (2 anni) si potranno aggiungere ulteriori 3 anni di garanzia, arrivando a 5 ANNI di garanzia, contro tutti i difetti di produzione. Non è una&nbsp;polizza assicurativa, ma sarà direttamente la EXPERT SOMMA che garantirà il prodotto per altri 2/3 anni al termine della&nbsp;<em>garanzia standard</em>.&nbsp;Con un piccolo “<em>investimento</em>” si ha la serenità di poter sempre contare sui punti vendita&nbsp;<strong>EXPERT SOMMA&nbsp;</strong>in caso di guasto di un articolo acquistato!</em></p></span>";

    var string_fin = "<tbody> <tr> <td colspan=\"2\"><strong><em>FINANZIAMENTI</em></strong></td> </tr>"+
		"<tr> <td>&nbsp;</td> <td>Acquistare da&nbsp;<strong>EXPERT SOMMA&nbsp;</strong>non comporta sacrifici perché è possibile pagare in comode rate mensili secondo le esigenze e il budget familiare, così si può avere subito ciò che serve,&nbsp;<strong>senza rinunciare alla qualità!</strong><br>"+
			"<strong>E' facile ottenere un finanziamento!</strong>&nbsp;<br>"+
			"Basta presentarsi presso il punto vendita, al momento dell'acquisto, con i seguenti documenti in originale:&nbsp;<br>"+
			"<br>	<em>Documento d'Identità valido&nbsp;<br> (carta d'identità - passaporto - patente)&nbsp;<br> Codice fiscale&nbsp;<br>"+
			"Ultimo cedolino paga (lavoratori dipendenti)&nbsp;<br>"+
			"Ultimo cedolino pensione (pensionati)&nbsp;<br>"+
      "Modello Unico (liberi professionisti)</em></td> </tr> </tbody>";
      
    var string_ritiro = "<span id=\"lblContenutoRitiro\"><p>I punti vendita EXPERT SOMMA effettuano le consegne a domicilio ed effettuano contestualmente il ritiro <strong>&quot;unoXuno&quot;</strong> delle apparecchiature elettriche ed elettroniche obsolete (cosiddetti RAEE Rifiuti da Apparecchiature Elettriche ed Elettroniche).<br> <br> Per poter avere il ritiro però sarà necessario l'acquisto, da parte del cliente, di un'apparecchiatura nuova di tipo equivalente e richiedere la consegna a domicilio. Utilizzando questo canale gratuito di ritiro dei RAEE si evita che gli stessi vengano gettati nella spazzatura o abbandonati nelle strade periferiche.&nbsp;<br> <br> La legge prevede, infatti, l'obbligo di raccolta differenziata dei RAEE e il divieto di smaltirli come rifiuto urbano.<br> Il simbolo del &quot;cassonetto barrato&quot; apposto sulle confezioni e/o sulle apparecchiature indica la necessità di procedere alla raccolta differenziata.<br> <br> Lo smaltimento non corretto dei RAEE può comportare gravi danni all'ambiente e alla salute umana a causa delle sostanze pericolose che possono essere contenute nelle apparecchiature o nei relativi componenti.<br> La violazione degli obblighi di legge, anche da parte del privato cittadino, è punita con pesanti sanzioni amministrative e penali.</p></span>";    
   
    var string_cons = "<span id=\"lblContenutoConsegna\"><p><em>E’ possibile richiedere la consegna della merce acquistata direttamente a casa o presso l’azienda ed è possibile far istallare i vari articoli direttamente dal personale specializzato.<br> <br> <br> Vengono effettuate consegne in qualsiasi parte della Campania!<br> I costi delle consegne e dell’istallazione sono conteggiati e comunicati al momento dell’acquisto.</em><br> &nbsp;</p></span>";
        
    var string_nozze = "<span id=\"lblContenutoListaNozze\"><p> E’ possibile richiedere la consegna della merce acquistata direttamente a casa o presso l’azienda ed è possibile far istallare i vari articoli direttamente dal nostro personale specializzato.<br> Nel reparto Lista Nozze si potrà trovare un vastissimo assortimento per la Casa scegliendo tra le migliori marche presenti sul mercato; oltre ai prodotti dedicati alla Cucina, alla Tavola ed al Complemento d'arredo, si potrà completare la propria Lista Nozze con Elettrodomestici e prodotti di Elettronica scegliendo tra le ultime novità, tutto in un unico luogo.<br> <br> <br> Con il servizio On line sarà anche più facile e comodo!!<br> <br> Gli invitati, infatti, potranno selezionare i regali comodamente collegandosi al sito della EXPERT SOMMA, ultizzando l'avanzato sistema di prenotazione e pagamento on line.<br> Gli sposi potranno, invece, controllare in tempo reale ciò che è stato prenotato dai propri invitati.<br> In questa area speciale del sito, infatti, si potranno verificare in ogni momento quali regali sono già stati acquistati e quali sono ancora disponibili. In ogni momento si potrà verificare lo stato d'avanzamento della lista e ogni qualvolta che verrà fatto un regalo gli sposi riceveranno una notifica via SMS.<br> <br> <br> Vengono effettuate consegne in qualsiasi parte della Campania!<br> <br> I costi delle consegne e dell’istallazione sono conteggiati e comunicati al momento dell’acquisto.</p></span>";

    var string_preventivi = "";

    var string_abbonamenti = "";

    var string_vendita = "";

    var string_wifi = "";

    var string_parcheggio = "";
    
    this.garanzia = new Servizi("EXTRA GARANZIA EXPERT SOMMA", string_este, null);

    this.finanziamenti = new Servizi("E' facile ottenere un finanziamento!", string_fin, null);
 
    this.consegna = new Servizi("Vengono effettuate consegne in qualsiasi parte della Campania!", string_cons, null);
    
    this.ritiro = new Servizi("I punti vendita EXPERT SOMMA effettuano il ritiro", string_ritiro, null);

    this.lista_nozze = new Servizi("Con il servizio On line sarà anche più facile e comodo!", string_nozze, null);
    
    this.preventivi = new Servizi("Preventivi gratuiti", string_preventivi, null);
    
    this.abbonamenti = new Servizi("Abbonamenti", string_abbonamenti, null);
    
    this.vendita = new Servizi("Ricariche", string_vendita, null);
    
    this.wifi = new Servizi("WiFi", string_wifi, null);
    
    this.parcheggio = new Servizi("Parcheggio", string_parcheggio, null);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiziPage');
  }

  presentPopover(servizio){
    
/*     let popover = this.popoverCtrl.create(PopoverPage3, {servizio: servizio});

    popover.present(); */

    let modal = this.modalCtrl.create(ServiziModalPage, {servizio: servizio});
    modal.present();

  }

  

}
