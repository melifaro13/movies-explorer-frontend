import { MainApi_BASE_URL } from './constants';

export function register(name, email, password) {
  return fetch(`${MainApi_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => {
      if (response.status === 200) {
       return response.json();
      }
      if (response.status === 409) {
        return Promise.reject('Пользователь с таким email уже существует');
      }
      return Promise.reject('При регистрации пользователя произошла ошибка');
    });
};

export function login(email, password) {
  return fetch(`${MainApi_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 401) {
      return Promise.reject('Вы ввели неправильную почту или пароль');
    }
    return Promise.reject('При регистрации пользователя произошла ошибка');
  });
};

export function logout() {
  return fetch(`${MainApi_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        response.json().then((data) => console.error(data.message));
        throw new Error();
      }
    })
    .catch((err) => {
      throw err
    });
};

export function getToken() {
  return fetch(`${MainApi_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
  .then((res) => res.json())
  .then((data) => data);
};
