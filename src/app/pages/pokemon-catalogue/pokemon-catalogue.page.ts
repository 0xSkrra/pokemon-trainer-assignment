import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon.model';
import { User } from 'src/app/models/user/user.model';
import { PokemonCatalogueService } from 'src/app/services/Pokemon/pokemon-catalogue.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {
  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.allPokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }
  get ownedPokemons(): Pokemon[] {
    return this.pokemonCatalogueService.collectedPokemons
  }
  

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
  }
  myOnPokemonClick = (pokemon: Pokemon): void =>{
    const user: User|undefined = this.userService.user
    this.pokemonCatalogueService.addPokemonToTrainer(pokemon, user!)
  }

}
