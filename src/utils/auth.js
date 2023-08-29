import { MainApi_BASE_URL, EmailIsAlreadyExists, ProfileError, IncorrectEmailOrPassword  } from './constants';

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
        return Promise.reject(EmailIsAlreadyExists);
      }
      return Promise.reject(ProfileError);
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
      return Promise.reject(IncorrectEmailOrPassword);
    }
    return Promise.reject(ProfileError);
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
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => Promise.reject(data.message));
    }
  });
}



