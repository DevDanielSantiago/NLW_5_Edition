import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store'
import { togglePlay, playNext, clearPlayingState, playingState, playPrevious, toggleLoop, toggleShuffle, progress } from '../../contexts/PlayerContext/PlayerContext'
import { convertDurationToTimeString } from '../../utils/convertDuration'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public episode: Episode
  public hasNext: boolean
  public hasPrevious: boolean
  public isPlaying: boolean
  public isShuffeling: boolean
  public isLooping: boolean
  public episodeList: Episode[]
  public currentEpisodeIndex: number

  public player$: Observable<any>
  public progress$: Observable<any>

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.loadStatePlayer()
    this.loadStateProgress()

    this.player$.subscribe((state) => {
      this.episode = state.episodeList[state.currentEpisodeIndex]
      this.hasNext = state.hasNext
      this.isPlaying = state.isPlaying
      this.isLooping = state.isLooping
      this.isShuffeling = state.isShuffeling
      this.episodeList = state.episodeList
      this.currentEpisodeIndex = state.currentEpisodeIndex
      this.hasNextVerify()
      this.hasPreviousVerify()
    })
  }

  loadStatePlayer (): void {
    this.player$ = this.store.pipe(select('playerReducer'))
  }

  loadStateProgress (): void {
    this.progress$ = this.store.pipe(select('progressReducer'))
  }

  togglePlay () {
    this.store.dispatch(togglePlay())

    const audio = <HTMLAudioElement>document.getElementById('player')
    if (this.isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  hasNextVerify () {
    this.hasNext = this.isShuffeling || (this.currentEpisodeIndex + 1) < this.episodeList.length
  }

  hasPreviousVerify () {
    this.hasPrevious = this.currentEpisodeIndex > 0
  }

  convertDuration (duration: number) {
    return convertDurationToTimeString(duration)
  }

  handleEpisodeEnded () {
    if (this.hasNext) {
      this.store.dispatch(playNext())
    } else {
      this.store.dispatch(clearPlayingState())
    }
  }

  setProgressListener() {
    const audio = <HTMLAudioElement>document.getElementById('player')
    audio.currentTime = 0

    audio.addEventListener('timeupdate', () => {
      this.store.dispatch(progress({ progress: Math.floor(audio.currentTime)}))
    })
  }

  playNext () {
    this.store.dispatch(playNext())
  }

  playPrevious () {
    this.store.dispatch(playPrevious())
  }

  playingState (state: boolean) {
    this.store.dispatch(playingState({ state }))
  }

  toggleLoop () {
    this.store.dispatch(toggleLoop())
  }

  toggleShuffle () {
    this.store.dispatch(toggleShuffle())
  }
}
