import { GetStaticProps } from 'next'
import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import ptBR from 'date-fns/locale/pt-BR'
import { format, parseISO } from 'date-fns'

import { api } from '../services/api'
import { usePlayer } from '../contexts/PlayerContext'
import { convertDurationToTimeString } from '../utils/convertDuration'

import styles from './home.module.scss'

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

type HomeProps = {
  latestEpisodes: Episode[];
  othersEpisodes: Episode[];
}

export default function Home({ latestEpisodes, othersEpisodes }: HomeProps) {
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...othersEpisodes]

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image width={192} height={192} src={episode.thumbnail} alt={episode.title} objectFit="cover" />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button onClick={() => playList(episodeList, index)} type="button">
                  <img src="/play-green.svg" alt="Tocar episódio"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.othersEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcasts</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {othersEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{width:72}}>
                    <Image width={120} height={120} src={episode.thumbnail} alt={episode.title} objectFit="cover" />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width: 100}}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button onClick={() => playList(episodeList, index + latestEpisodes.length)} type="button">
                      <img src="./play-green.svg" alt="Tocar episódio"/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
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