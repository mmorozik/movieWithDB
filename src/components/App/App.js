import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Tabs } from 'antd'

import './App.css'

import { MovieServiceProvider } from '../MovieServiceContext'
import PaginationPage from '../PaginationPage'
import Spiner from '../Spiner'
import SearchBar from '../SearchBar'
import MovieService from '../MovieService'
import MovieList from '../MovieList'
import OfflinePage from '../OfflinePage'

export default class App extends Component {
  constructor() {
    super()
    this.movieService = new MovieService()
    this.state = {
      guestSessionId: null,
      totalPages: 1,
      totalRagePage: 1,
      movieName: 'return',
      page: 1,
      ratePage: 1,
      movie: [],
      rateMovie: [],
      rateMoviePro: [],
      genre: [],
      error: false,
      loading: true,
    }
  }

  onError() {
    this.setState({
      error: true,
      loading: false,
    })
  }

  getGuestSessionId() {
    this.movieService
      .createGuestSession()
      .then((body) => body.guest_session_id)
      .then((guestId) => {
        this.setState({
          guestSessionId: guestId,
        })
      })
  }

  getMovie() {
    const movieList = this.movieService.getResource(this.state.movieName, this.state.page)
    movieList
      .then((body) => {
        this.setState(() => {
          return {
            totalPages: body.total_pages,
          }
        })
        return body.results
      })
      .then((body) => {
        const movieArr = body.map((movie) => {
          movie.rateMovie = 0
          this.state.rateMovie.forEach((el) => {
            if (el.id === movie.id) {
              movie.rateMovie = el.rateMovie
            }
          })
          return movie
        })
        this.setState({
          movie: movieArr,
          loading: false,
        })
      })
      .catch(() => this.onError())
  }

  onRateMovie(movieId, vote, movie) {
    this.movieService.postRate(this.state.guestSessionId, movieId, vote)
    const newRateMovie = this.state.rateMovie.slice(0)
    let toggle = true
    if (newRateMovie.length > 0) {
      newRateMovie.forEach((el) => {
        if (el.id === movieId) {
          el.rateMovie = vote
          toggle = false
        }
      })
    }
    if (toggle) {
      const newMovie = {}
      Object.assign(newMovie, movie)
      newMovie.rateMovie = vote
      newRateMovie.push(newMovie)
    }
    this.setState(() => {
      return {
        rateMovie: newRateMovie,
      }
    })
  }

  getMovieInGuestSession() {
    this.movieService
      .getMovieInGuestSession(this.state.guestSessionId)
      .then((body) => {
        this.setState(() => {
          return {
            totalRagePage: body.total_pages,
          }
        })
        return body
      })
      .then((body) => {
        this.setState(() => {
          return {
            rateMoviePro: body.results,
          }
        })
      })
  }

  onSearch(movieName) {
    this.setState(() => {
      return {
        movieName: movieName,
        page: '1',
      }
    })
  }

  onPage(page) {
    this.setState(() => {
      return {
        page: page,
      }
    })
  }

  onRatePage(page) {
    this.setState(() => {
      return {
        ratePage: page,
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.movieName !== prevState.movieName) this.getMovie()
    if (this.state.page !== prevState.page) this.getMovie()
  }

  componentDidMount() {
    this.getGuestSessionId()
    this.getMovie()
    const generList = this.movieService.getGenre()
    generList.then((body) =>
      this.setState({
        genre: body.genres,
      })
    )
  }

  render() {
    const { loading, error } = this.state
    const errorMasage = (
      <div key={'errorMasage'} className="error-alert">
        <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon />
      </div>
    )
    const searchInput = (
      <div key={'searchInput'} className="wrapper">
        <SearchBar searchFn={this.onSearch.bind(this)} />
      </div>
    )
    const paginationPage = (
      <PaginationPage
        key={'paginationPage'}
        totalPages={this.state.totalPages}
        onPage={this.onPage.bind(this)}
        pageNumber={this.state.page}
      />
    )
    const paginationPageGuest = (
      <PaginationPage
        key={'paginationPageGuest'}
        totalPages={this.state.totalRagePage}
        onPage={this.onRatePage.bind(this)}
        pageNumber={this.state.ratePage}
      />
    )
    const content =
      !loading && !error ? (
        <MovieList key={'content'} movieArr={this.state.movie} onRateMovie={this.onRateMovie.bind(this)} />
      ) : null
    const rated = (
      <MovieList key={'rateContent'} movieArr={this.state.rateMovie} onRateMovie={this.onRateMovie.bind(this)} />
    )
    const errorAlert = error ? { errorMasage } : null
    const spiner = loading ? <Spiner key={'spiner'} /> : null
    return (
      <>
        <Online>
          <MovieServiceProvider value={this.state.genre}>
            <Tabs
              onChange={this.getMovieInGuestSession.bind(this)}
              defaultActiveKey="1"
              centered
              items={[
                {
                  label: 'Search',
                  key: 'tabSearch',
                  children: [searchInput, content, errorAlert, spiner, paginationPage],
                },
                {
                  label: 'Rated',
                  key: 'tabRated',
                  children: [rated, errorAlert, spiner, paginationPageGuest],
                },
              ]}
            />
          </MovieServiceProvider>
        </Online>
        <Offline>
          <OfflinePage />
        </Offline>
      </>
    )
  }
}
