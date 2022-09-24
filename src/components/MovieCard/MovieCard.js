import React, { Component } from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'

import { MovieServiceConsumer } from '../MovieServiceContext'

import './MovieCard.css'
import zaglushka from './zaglushka.png'

export default class MovieCard extends Component {
  constructor() {
    super()
    this.state = {
      rate: 10,
    }
  }
  colorBorder(vote) {
    if (vote < 3) return { border: '2px solid #E90000' }
    if (vote < 5) return { border: '2px solid #E97E00' }
    if (vote < 7) return { border: '2px solid #E9D100' }
    return { border: '2px solid #66E900' }
  }
  editDescription() {
    const text = this.props.overview
    if (text.length < 170) return text
    if (this.props.title.length > 25 && this.props.genre_ids.length > 2)
      return text.slice(0, text.slice(0, 100).lastIndexOf(' ')) + '...'
    if (this.props.title.length > 25) return text.slice(0, text.slice(0, 120).lastIndexOf(' ')) + '...'
    if (this.props.genre_ids.length > 2) return text.slice(0, text.slice(0, 140).lastIndexOf(' ')) + '...'
    const res = text.slice(0, text.slice(0, 170).lastIndexOf(' ')) + '...'
    return res
  }
  onRateMovie(rate) {
    this.setState(() => {
      return {
        rate: rate,
      }
    })
    this.props.onRateMovie(this.props.movieId, rate, this.props.movie)
  }
  render() {
    const { title, poster_path, release_date, genre_ids, vote_average } = this.props
    const imgUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : zaglushka
    const date = release_date ? format(new Date(release_date), 'MMMM dd, yyyy') : null
    const description = this.editDescription()
    return (
      <MovieServiceConsumer>
        {(genre) => {
          const genreValue = genre_ids.map((el) => {
            const generList = genre.filter((gen) => {
              if (gen.id === el) {
                return true
              }
            })
            return <div key={title + el}>{generList[0].name}</div>
          })
          return (
            <div className="card">
              <div className="card__vote" style={this.colorBorder(vote_average)}>
                <span>{vote_average}</span>
              </div>
              <img className="card__img" src={imgUrl} alt="img" />
              <div className="card__text">
                <h3 className="card__title">{title}</h3>
                <h5 className="card__date">{date}</h5>
                <div className="card__genre">{genreValue}</div>
                <div className="card__description">
                  <p>{description}</p>
                </div>
                <Rate
                  className="card__rate"
                  defaultValue={this.props.rateMovie}
                  count={10}
                  style={{ fontSize: 18 }}
                  onChange={this.onRateMovie.bind(this)}
                />
              </div>
            </div>
          )
        }}
      </MovieServiceConsumer>
    )
  }
}
