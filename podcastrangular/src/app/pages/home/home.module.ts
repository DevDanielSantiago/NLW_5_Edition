import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { HomeRoutes } from './home.routing';
import { EpisodesComponent } from './episodes/episodes.component';
import { EpisodeDetailedComponent } from './episode-detailed/episode-detailed.component';
import { CardEpisodeComponent } from 'src/app/components/card-episode/card-episodes.component';

@NgModule({
  declarations: [
    CardEpisodeComponent,
    EpisodesComponent,
    EpisodeDetailedComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ],
  exports: [
    EpisodesComponent,
    EpisodeDetailedComponent
  ]
})
export class HomeModule { }
