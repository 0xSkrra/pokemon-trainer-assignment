import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon/pokemon.model';
import { PokemonResponse } from '../models/pokemon/pokemonResponse';
import { StorageUtil } from '../utils/storage.util';


const { apiPokemon, apiPokemonImgUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private readonly _pokemons = new BehaviorSubject<Pokemon[]>([]);
  readonly _pokemon$ = this._pokemons.asObservable();
  private _error: string = "";
  private _loading: boolean = false;

  get pokemons(): Pokemon[] {
    if(this._pokemons.getValue().length < 1){
      this.findAllPokemon()
    }
    return this._pokemons.getValue();
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {
    const storagePokemons: Pokemon[]|undefined = StorageUtil.storageRead('pokemons')
    if(typeof storagePokemons !== 'undefined'){
      this._pokemons.next(storagePokemons)
    }
  }

  public findAllPokemon(): void {
    this._loading = true;
    this.http.get<PokemonResponse>(apiPokemon)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemons: PokemonResponse) => {
          //iterate url props on pokemon to be img url
          pokemons.results.forEach( (p) => {
            // simplest solution to getting the numbers since they can be single, double, triple digit etc?
            const pokemonUrlArr = p.url.split('/')
            const pokemonUrlId = pokemonUrlArr[pokemonUrlArr.length -2]
            // set url to img on url prop
            p.url = apiPokemonImgUrl + pokemonUrlId + ".png"
          })
          // set results 
          this._pokemons.next(pokemons.results)
          StorageUtil.storageSave('pokemons', pokemons.results)
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
      
  }

}
