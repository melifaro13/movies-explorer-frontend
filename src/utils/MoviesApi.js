import { MovieApi_BASE_URL } from './constants';

class MovieApi {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getMovies() {
    return fetch(`${this._address}/beatfilm-movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const movieApi = new MovieApi({
  baseUrl: MovieApi_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default movieApi;
