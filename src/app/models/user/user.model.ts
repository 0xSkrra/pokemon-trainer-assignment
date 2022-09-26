import { Pokemon } from "../pokemon/pokemon.model";

export interface User {
    id: number;
    username: string;
    //isAuthenticated: boolean;
    Pokemon: Pokemon[];
}