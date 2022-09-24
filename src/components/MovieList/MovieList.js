import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons'

import './MovieList.css'
import MovieCard from '../MovieCard'

export default class MovieList extends Component {
  constructor() {
    super()
  }

  render() {
    const { movieArr, onRateMovie } = this.props
    const movies = movieArr.map((movie) => {
      return (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          overview={movie.overview}
          genre_ids={movie.genre_ids}
          vote_average={movie.vote_average}
          rateMovie={movie.rateMovie}
          movieId={movie.id}
          movie={movie}
          onRateMovie={onRateMovie}
        />
      )
    })
    const noResult =
      movieArr.length === 0 ? (
        <div>
          <SearchOutlined />
          <span>Поиск не дал результатов :(</span>
        </div>
      ) : null
    return (
      <div className="wrap">
        {movies}
        {noResult}
      </div>
    )
  }
}
