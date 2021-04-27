import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { reducerPlayer as playerReducer, reducerProgress as progressReducer } from './contexts/PlayerContext/PlayerContext'
import { HomeModule } from './pages/home/home.module';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
  ],
  imports: [
    HomeModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreModule.forRoot({
      playerReducer,
      progressReducer
    })
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
