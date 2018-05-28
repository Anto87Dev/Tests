export class Prodotti{

    nome: string;

    immagine: string;

    descrizione: string;

    categoria: string;

    sconto: number;

    prezzo: number; 

    codice: string;

    wishlist: boolean;

    compare: boolean;

    mod_gioco: string;
    
    col_prod: string;
    
    wifi: string;
    
    smart_tv: string;
    
    dim_schermo: string;
    
    formato: string;
    
    tec_displ: string;

    forma: string;

    volantino: boolean;

    constructor(nome: string, immagine: string, descrizione: string, categoria: string, sconto: number, prezzo: number, codice: string, wishlist: boolean, compare: boolean, mod_gioco: string, col_prod: string, wifi: string, smart_tv: string, dim_schermo: string, formato: string, forma: string,tec_displ: string, volantino: boolean){

        this.nome = nome;

        this.immagine = immagine;

        this.descrizione = descrizione;

        this.categoria = categoria;

        this.sconto = sconto;

        this.prezzo = prezzo;

        this.codice = codice;

        this.wishlist = wishlist;

        this.compare = compare;

        this.mod_gioco = mod_gioco;

        this.col_prod = col_prod;

        this.wifi = wifi;

        this.smart_tv = smart_tv;

        this.dim_schermo = dim_schermo;

        this.formato = formato;

        this.forma = forma;

        this.tec_displ = tec_displ;

        this.volantino = volantino;

    }

    getNome(value){

        this.nome = value;

    }

    getImmagine(value){

        this.immagine = value;

    }

    getDescrizione(value){

        this.descrizione = value;

    }

    getCategoria(value){

        this.categoria = value;

    }

    getPrezzo(value){

        this.prezzo = value;

    }

    getCodice(value){

        this.codice = value;

    }

    getWishlist(value){

        this.wishlist = value;

    }

    getCompare(value){

        this.compare = value;

    }

}