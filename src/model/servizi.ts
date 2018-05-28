export class Servizi{

    titolo: string;

    immagine: string;

    descrizione: string;

    constructor(titolo: string, descrizione: string, immagine: string){

        this.titolo = titolo;

        this.immagine = immagine;

        this.descrizione = descrizione;

    }

    getTitolo(value){

        this.titolo = value;

    }

    getImmagine(value){

        this.immagine = value;

    }

    getDescrizione(value){

        this.descrizione = value;

    }

}