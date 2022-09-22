import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCollectionComponent } from './components/pokemon-collection/pokemon-collection.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { LandingPage } from './pages/landing/landing.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCollectionComponent,
    PokemonListComponent,
    LandingPage,
    TrainerPage,
    PokemonCataloguePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
