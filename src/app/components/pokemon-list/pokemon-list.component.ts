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
}
