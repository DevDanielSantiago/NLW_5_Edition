import { createAction, createReducer, props, on } from '@ngrx/store'

enum ActionTypes {
  Play = 'Play',
  PlayList = 'PlayList',
  PlayNext = 'PlayNext',
  PlayPrevious = 'PlayPrevious',
  ClearPlayingState = 'ClearPlayingState',
  TogglePlay = 'TogglePlay',
  ToggleLoop = 'ToggleLoop',
  ToggleShuffle = 'ToggleShuffle',
  PlayingState = 'PlayingState',
  Progress = 'Progress'
}

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

function playNextVerify (isShuffeling: boolean, episodeList: Episode[], currentEpisodeIndex: number) {
  if (isShuffeling) {
    const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
    return nextRandomEpisodeIndex

  } else if (isShuffeling || (currentEpisodeIndex + 1) < episodeList.length) {
    return currentEpisodeIndex + 1
  } else {
    return 0;
  }
}

function playPreviousVerify (currentEpisodeIndex: number) {
  if (currentEpisodeIndex > 0) {
    return currentEpisodeIndex - 1
  } else {
    return 0
  }
}

export const togglePlay = createAction(
  ActionTypes.TogglePlay
)

export const toggleLoop = createAction(
  ActionTypes.ToggleLoop
)

export const toggleShuffle = createAction(
  ActionTypes.ToggleShuffle
)

export const play = createAction(
  ActionTypes.Play,
  props<{ episode: Episode }>()
)

export const playNext = createAction(
  ActionTypes.PlayNext,
)

export const playPrevious = createAction(
  ActionTypes.PlayPrevious,
)

export const playingState = createAction(
  ActionTypes.PlayingState,
  props<{ state: boolean }>()
)

export const playList = createAction(
  ActionTypes.PlayList,
  props<{ episode: Episode[], index: number }>()
)

export const clearPlayingState = createAction(
  ActionTypes.ClearPlayingState
)

export const progress = createAction(
  ActionTypes.Progress,
  props<{ progress: number }>()
)

const INITIAL_PLAYING = {
  episodeList: [],
  currentEpisodeIndex: 0,
  isPlaying: false,
  isLooping: false,
  isShuffeling: false
}

const INITIAL_PROGRESS = {
  progress: 0
}

export const reducerProgress = createReducer(
  INITIAL_PROGRESS,
  on(progress, (state, action) => ({
    ...state,
    progress: action.progress
  })),
)

export const reducerPlayer = createReducer(
  INITIAL_PLAYING,
  on(play, (state, action) => ({
    ...state,
    episodeList: [action.episode],
    currentEpisodeIndex: 0,
    isPlaying: true
  })),
  on(playList, (state, action) => ({
    ...state,
    episodeList: action.episode,
    currentEpisodeIndex: action.index,
    isPlaying: true
  })),
  on(clearPlayingState, (state) => ({
    ...state,
    episodeList: [],
    currentEpisodeIndex: 0,
    isPlaying: false
  })),
  on(togglePlay, (state) => ({
    ...state,
    isPlaying: !state.isPlaying
  })),
  on(toggleLoop, (state) => ({
    ...state,
    isLooping: !state.isLooping
  })),
  on(toggleShuffle, (state) => ({
    ...state,
    isShuffeling: !state.isShuffeling
  })),
  on(playingState, (state, action) => ({
    ...state,
    isPlaying: action.state
  })),
  on(playNext, (state) => ({
    ...state,
    currentEpisodeIndex: playNextVerify(state.isShuffeling, state.episodeList, state.currentEpisodeIndex)
  })),
  on(playPrevious, (state) => ({
    ...state,
    currentEpisodeIndex: playPreviousVerify(state.currentEpisodeIndex)
  })),
)