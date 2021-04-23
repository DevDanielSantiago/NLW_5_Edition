import { createContext, useState, ReactNode } from 'react'

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
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider ({children}) {
  const [episodeList, setEpisodeLista] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

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

  function setPlayingState (state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{
      episodeList, 
      currentEpisodeIndex, 
      isPlaying, 
      play,
      playList,
      togglePlay, 
      setPlayingState
    }}>
      {children}
    </PlayerContext.Provider>
  )
}