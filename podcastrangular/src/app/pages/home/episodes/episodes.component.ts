import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Store } from '@ngrx/store'
import { take } from 'rxjs/operators';

import { play, playList } from './../../../contexts/PlayerContext/PlayerContext'
import { convertDurationToTimeString } from './../../../utils/convertDuration'

import { HomeService } from './../home.service';

type Episode = {
  id: string;
  title: string;
  members: string,
  publishedAt: string,
  thumbnail: string,
  duration: number,
  durationAsString: string,
  url: string
}

@Component({
  selector: 'app-home',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
  providers: [HomeService]
})
export class EpisodesComponent implements OnInit {

  public episodes: Episode[]
  public latestEpisodes: Episode[]
  public othersEpisodes: Episode[]

  constructor(
    private store: Store<any>,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getEpisodes()
  }

  getEpisodes () {
    this.homeService.episodesList()
      .pipe(take(1))
      .subscribe((data) => {
      this.serializeEpisodes(data)
    })
  }

  serializeEpisodes(data) {
    this.episodes = data.map((episode) => {
      return {
        id: episode.id,
        title: episode.title,
        members: episode.members,
        publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
        thumbnail: episode.thumbnail,
        duration: Number(episode.file.duration),
        durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
        url: episode.file.url
      }
    })

    this.latestEpisodes = this.episodes.slice(0, 2)
    this.othersEpisodes = this.episodes.slice(2, this.episodes.length)
  }
 
  play (episode: Episode): void {
    this.store.dispatch(play({ episode }))
  }

  playList (index: number): void {
    const episodesList = [...this.latestEpisodes ,...this.othersEpisodes]
    this.store.dispatch(playList({ episode: episodesList, index }))
  }
}
