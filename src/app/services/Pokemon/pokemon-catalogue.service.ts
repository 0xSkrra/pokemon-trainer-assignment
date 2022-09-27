import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../../enums/storage-keys.enum';
import { Pokemon } from '../../models/pokemon/pokemon.model';
import { PokemonResponse } from '../../models/pokemon/pokemonResponse';
import { User } from '../../models/user/user.model';
import { StorageUtil } from '../../utils/storage.util';


const { apiPokemon, apiPokemonImgUrl, apiUsers, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private readonly _allPokemons = new BehaviorSubject<Pokemon[]>([]);
  private readonly _collectedPokemons = new BehaviorSubject<Pokemon[]>([])
  readonly _allPokemon$ = this._allPokemons.asObservable()
  readonly _collectedPokemons$ = this._collectedPokemons.asObservable()
  private _error: string = "";
  private _loading: boolean = false;

  
  get allPokemons(): Pokemon[] {
    if(this._allPokemons.getValue().length < 1){
      this.findAllPokemon()
    }
    return this._allPokemons.getValue()
  }
  get collectedPokemons(): Pokemon[] {
    return this._collectedPokemons.getValue()
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {
    //fetch all pokemons from storage if possible
    const storagePokemons: Pokemon[]|undefined = StorageUtil.storageRead('pokemons')
    if(typeof storagePokemons !== 'undefined'){
      this._allPokemons.next(storagePokemons)
    }
    const userPokemons: User = StorageUtil.storageRead(StorageKeys.User)!
    this._collectedPokemons.next(userPokemons.Pokemon)
  }
  // patch new pokemon to pokemon collection on a trainer(user)
  public addPokemonToTrainer(pokemon: Pokemon, user: User){
    //if user already has these pokemon
    if(this.collectedPokemons.some((p: Pokemon) => p.name === pokemon.name)) return
    // do we need to re-fetch user for pokemon or does this work?
    user.Pokemon = [...this.collectedPokemons, pokemon]
    

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    return this.http.patch<User>(`${apiUsers}/${user.id}`, user, {
      headers
    }).subscribe({
      next: (data: User) => {
        // update storage
        this._collectedPokemons.next(data.Pokemon)
        StorageUtil.storageSave<User>(StorageKeys.User, user!)
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        this._error = error.message
      }
    })
  }
    // patch remove pokemon from pokemon collection on a trainer(user)
    public removePokemonFromTrainer(pokemon: Pokemon, user: User){
      //if user doesnt have these pokemon
      if(!this.collectedPokemons.some((p) => p.name === pokemon.name)) return

      user.Pokemon = this.collectedPokemons.filter((p) =>  p.name !== pokemon.name)
  
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-api-key": apiKey
      })
  
      return this.http.patch<User>(`${apiUsers}/${user.id}`, user, {
        headers
      }).subscribe({
        next: (data: User) => {
          //console.log(data)
          // update storage and state
          this._collectedPokemons.next(data.Pokemon)
          StorageUtil.storageSave<User>(StorageKeys.User, user!)
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error)
          this._error = error.message
        }
      })
    }
  public getPokemonByTrainer(id: number){
    this._loading = true;
    return this.http.get<Pokemon[]>(`${apiUsers}/${id}`)
      .pipe(
        finalize(() =>{
          this._loading = false
        })
      )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          this._collectedPokemons.next(pokemons)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
          this._error = error.message
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
          this._allPokemons.next(pokemons.results)
          StorageUtil.storageSave('pokemons', pokemons.results)
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
      
  }

}
