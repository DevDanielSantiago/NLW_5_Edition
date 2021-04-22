import { GetStaticProps } from 'next'
import { api } from '../services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDuration'
import Image from 'next/image'

import styles from './home.module.scss'

type Episode = {
  id: string;
  title: string;
  members: string,
  publishedAt: string,
  thumbnail: string,
  description: string,
  duration: number,
  durationAsString: string,
  url: string
}

type HomeProps = {
  latestEpisodes: Episode[];
  othersEpisodes: Episode[];
}

export default function Home({ latestEpisodes, othersEpisodes }: HomeProps) {
  return (
    <></>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      thumbnail: episode.thumbnail,
      description: episode.description,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const othersEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      othersEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}