import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Store } from '@ngrx/store'

import { play } from './../../../contexts/PlayerContext/PlayerContext'
import { HomeService } from './../../home/home.service';
import { convertDurationToTimeString } from 'src/app/utils/convertDuration';

type Episode = {
  id: string;
  title: string;
  members: string,
  publishedAt: string,
  description: string,
  thumbnail: string,
  duration: number,
  durationAsString: string,
  url: string
}

@Component({
  selector: 'app-episode-detailead',
  templateUrl: './episode-detailed.component.html',
  styleUrls: ['./episode-detailed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EpisodeDetailedComponent implements OnInit, OnDestroy {

  public episode: Episode

  private subscription: Subscription;

  constructor(
    private store: Store<any>,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.queryUrl()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  queryUrl(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.getEpisode(params.id)
    })
  }

  getEpisode (id: string) {
    this.homeService.episode(id)
      .pipe(take(1))
      .subscribe((data) => {
        this.serializeEpisodes(data)
      })
  }

  serializeEpisodes(data) {
    this.episode = {
      id: data.id,
      title: data.title,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
      thumbnail: data.thumbnail,
      description: data.description,
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      url: data.file.url
    }
  }

  play (episode: Episode): void {
    this.store.dispatch(play({ episode }))
  }

}
