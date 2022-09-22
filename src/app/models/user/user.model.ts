import { Pokemon } from "../pokemon/pokemon.model";

export interface User {
    id: number;
    username: string;
    //isAuthenticated: boolean;
    pokemonCollection: Pokemon[];
}

/*
export const defaultUser: User ={
    id: -1,
    username: "",
    isAuthenticated: false,
    pokemonCollection: []
}
*/