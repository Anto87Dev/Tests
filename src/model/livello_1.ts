import { Livello_2 } from "./livello_2";

export interface Livello_1 {
    
    id_liv_1: number;

    icona: String;

    nome_cat_liv_1: String;

    categorie_liv_2: Livello_2[];

    empty: boolean;

    color: String;
    
}