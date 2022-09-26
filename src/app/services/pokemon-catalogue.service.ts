import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon/pokemon.model';
import { PokemonResponse } from '../models/pokemon/pokemonResponse';
import { User } from '../models/user/user.model';
import { StorageUtil } from '../utils/storage.util';


const { apiPokemon, apiPokemonImgUrl, apiUsers, apiKey} = environment;

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
  // patch new pokemon to pokemon collection on a trainer(user)
  public addPokemonToTrainer(pokemon: Pokemon, user: User){
    //if user already has these pokemon
    if(user.Pokemon.includes(pokemon)) return
    // do we need to re-fetch user for pokemon or does this work?
    user.Pokemon = [...user.Pokemon, pokemon]
    

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    return this.http.patch<User>(`${apiUsers}/${user.id}`, user, {
      headers
    }).subscribe({
      next: (data: User) => {
        console.log(data)
        // update storage
        StorageUtil.storageSave<User>(StorageKeys.User, user!)
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
      }
    })
    
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
