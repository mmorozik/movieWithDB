export default class MovieService {
  constructor() {
    this._apiKey = '1f9e8772655504088f2df2dbab0143f9'
    this._basicUrl = 'https://api.themoviedb.org/3/'
    this._guestSession = '11475fd80732506e75e660017bf1869c'
    this._testErr = 'https://api.themoviedb.org/3/movie/1233432123?api_key=1f9e8772655504088f2df2dbab0143f9'
  }

  async getGenre() {
    const res = await fetch(`${this._basicUrl}genre/movie/list?api_key=${this._apiKey}`)
    return res.json()
  }
  async getResource(movieName, page) {
    const res = await fetch(
      `${this._basicUrl}search/movie?api_key=${this._apiKey}&query=${movieName}&page=${page}&append_to_response=total_pages`
    )
    if (!res.ok) {
      throw new Error(`Url: ${this._basicUrl}${movieName}
            , status ${res.status}`)
    }
    return await res.json()
  }

  async createGuestSession() {
    const res = await fetch(`${this._basicUrl}authentication/guest_session/new?api_key=${this._apiKey}`)
    return res.json()
  }

  async postRate(guestId, movieId, vote) {
    const res = await fetch(
      `${this._basicUrl}movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: vote,
        }),
      }
    )
    return res
  }

  async getMovieInGuestSession(guestId) {
    const res = await fetch(
      `${this._basicUrl}guest_session/${guestId}/rated/movies?api_key=${this._apiKey}&sort_by=created_at.asc`
    )
    return res.json()
  }
}
