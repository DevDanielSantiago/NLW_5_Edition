import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-card-episode',
  templateUrl: './card-episode.component.html',
  styleUrls: ['./card-episode.component.scss']
})
export class CardEpisodeComponent implements OnInit {

  @Input() latestEpisodes: Episode[]
  @Output() episode: EventEmitter<Episode> = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  emitterEpisode (episode: Episode): void {
    this.episode.emit(episode)
  }

}
