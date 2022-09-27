import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: Pokemon[] = []
  // function from parent class to handle pokemon click
  @Input() onPokemonClick!: (pokemon: Pokemon) => void
  @Input() ownedPokemons?: Pokemon[]

  constructor() { }

  ngOnInit(): void {
  }

  // helper to set pokemons to collected 
  hasCollectedPokemon = (pokemon: Pokemon): boolean =>{
    return this.ownedPokemons ? this.ownedPokemons?.some((p) => p.name === pokemon.name) : false
  }

  getId(pokemon: Pokemon){
    const array = pokemon.url.split('/');
    const png = array[array.length-1];
    
    const array2 = png.split('.');
    const id = array2[0];

    return id;
  }
}
