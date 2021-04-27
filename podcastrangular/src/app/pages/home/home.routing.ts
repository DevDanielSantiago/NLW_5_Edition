import { Routes } from '@angular/router';
import { EpisodesComponent } from './episodes/episodes.component';
import { EpisodeDetailedComponent } from './episode-detailed/episode-detailed.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EpisodesComponent
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'episode/:id',
        component: EpisodeDetailedComponent
      }
    ]
  }
]

export class HomeRoutingModule { }
