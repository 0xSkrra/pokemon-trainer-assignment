import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {
  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }
  get ownPokemons(): Pokemon[] {
    return this.userService.user?.Pokemon!
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
