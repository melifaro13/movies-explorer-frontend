import { ScreenSizeMap, ShortFilmDuration } from './constants';

const updateFilteredMovies = (movies, query, checked) => {
  let filteredResults = [];

  filteredResults = movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(query.toLowerCase()),
  );
  if (checked) {
    filteredResults = filteredResults.filter((movie) => movie.duration <= ShortFilmDuration);
  }

  return filteredResults;
};

const findScreenSize = (screenWidth) => {
  if (screenWidth >= 1200) {
    return ScreenSizeMap.xl;
  } else if (screenWidth >= 900) {
    return ScreenSizeMap.lg;
  } else if (screenWidth >= 600) {
    return ScreenSizeMap.md;
  } else {
    return ScreenSizeMap.sm;
  }
};

const convertDuration = (number) => {
  const hours = Math.floor(number / 60);
  const minutes = number % 60;
  return `${hours}ч ${minutes}м`;
};

export { updateFilteredMovies, findScreenSize, convertDuration };
