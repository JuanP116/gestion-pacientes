import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { RandomComponent } from './components/random/random.component';
import { NotFoundComponent } from './components/not-found/404.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { PlayersByPositionPipe } from './pipes/players-by-position.pipe';
import { TagsPipe } from './pipes/tags.pipe';
import { MatchResultPipe } from './pipes/match-result.pipe';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    ListComponent,
    RandomComponent,
    NotFoundComponent,
    DetailsComponent,
    PlayersByPositionPipe,
    TagsPipe,
    AboutComponent,
    MatchResultPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
