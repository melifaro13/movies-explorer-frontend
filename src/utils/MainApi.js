import { MainApi_BASE_URL, MovieApi_BASE_URL } from './constants';

class MainApi {
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

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(res => this._checkResponse(res));
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(res => this._checkResponse(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 409) {
        return Promise.reject('Пользователь с таким email уже существует');
      }
      return Promise.reject('При обновлении профиля произошла ошибка');
    });
  }

  addMovies(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        image: `${MovieApi_BASE_URL}${data.image.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `${MovieApi_BASE_URL}${data.image.url}`,
        trailerLink: data.trailerLink,
        year: data.year,
      }),
    }).then(res => this._checkResponse(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
    }).then(res => this._checkResponse(res));
  }
}

const mainApi = new MainApi({
  baseUrl: MainApi_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
