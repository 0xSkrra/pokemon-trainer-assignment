import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon.model';
import { User } from 'src/app/models/user/user.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  onClick(pokemon: Pokemon): void{
    const user: User|undefined = this.userService.user
    this.pokemonCatalogueService.addPokemonToTrainer(pokemon, user!)
  }

  @Input() pokemons: Pokemon[] = [];
  @Input() ownedPokemons: Pokemon[] = [];

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly userService: UserService) { }

  ngOnInit(): void {
  }

}
