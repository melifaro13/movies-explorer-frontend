//const MainApi_BASE_URL = "https://api.melifaro1304.nomoredomains.xyz";
const MainApi_BASE_URL = "http://localhost:4000";
const MovieApi_BASE_URL = "https://api.nomoreparties.co";

const authPages = ["/movies", "/saved-movies", "/profile"];

const ShortFilmDuration = 40;

const SucsessChangeInfo = "Данные успешно изменены!";
const ErrorAuthMessage = "Такие данные уже используются. Измените данные";
const EmailIsAlreadyExists = "Пользователь с таким email уже существует";
const ProfileError = "При обновлении профиля произошла ошибка";
const IncorrectEmailOrPassword = "Вы ввели неправильную почту или пароль";

const ScreenSizeMap = {
  xl: { cards: 16, addCardsNumber: 4 },
  lg: { cards: 12, addCardsNumber: 3 },
  md: { cards: 8, addCardsNumber: 4 },
  sm: { cards: 5, addCardsNumber: 2 },
};

export {
  MainApi_BASE_URL,
  MovieApi_BASE_URL, authPages,
  SucsessChangeInfo,
  ErrorAuthMessage,
  EmailIsAlreadyExists,
  ProfileError,
  IncorrectEmailOrPassword,
  ScreenSizeMap,
  ShortFilmDuration
};
