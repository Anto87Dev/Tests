import { Livello_3 } from "./livello_3";

export interface Livello_2 {
    
    id_liv_2: number;
    
    nome_cat_liv_2: String;

    categorie_liv_3:  Livello_3[];

    empty: boolean;

}