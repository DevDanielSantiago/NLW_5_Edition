import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffeling: boolean;
  togglePlay: () => void;
  toggleLoop: () => void;
  toogleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayingState: () => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
  children: ReactNode
}

export function PlayerContextProvider ({children}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeLista] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffeling, setIsShuffeling] = useState(false)

  function play (episode: Episode) {
    setEpisodeLista([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList (list: Episode[], index: number) {
    setEpisodeLista(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay () {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop () {
    setIsLooping(!isLooping)
  }

  function toogleShuffle () {
    setIsShuffeling(!isShuffeling)
  }

  function setPlayingState (state: boolean) {
    setIsPlaying(state)
  }

  function clearPlayingState () {
    setEpisodeLista([])
    setCurrentEpisodeIndex(0)
    setIsPlaying(false)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffeling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext () {
    if (isShuffeling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)

    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious () {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider value={{
      episodeList, 
      currentEpisodeIndex, 
      isPlaying,
      isLooping,
      isShuffeling,
      play,
      playList,
      togglePlay,
      toggleLoop,
      toogleShuffle,
      setPlayingState,
      clearPlayingState,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}