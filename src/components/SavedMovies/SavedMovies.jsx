import Header from '../Header/Header'
import SeachForm from '../Movies/SearchForm/SeachForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import FilterCheckbox from '../Movies/FilterCheckbox/FilterCheckbox';
import Footer from '../Footer/Footer';

import mainApi from '../../utils/MainApi';
import { updateFilteredMovies } from '../../utils/utils';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function SavedMovies({ onDelete, showError }) {

  const [savedMovies, setSavedMovies] = useState([]);
  const { isLoading, setIsLoading } = useContext(CurrentUserContext);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);
  const [searchMovie, setSearchMovie] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const handleDelete = (movieId) => {
    onDelete(movieId);
    setSavedMovies((prev) => prev.filter((movie) => movie._id !== movieId));
    setFilteredMovies((prev) => prev.filter((movie) => movie._id !== movieId));
  };

  useEffect(() => {
    setIsLoading(true);
    mainApi
      .getAllMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setFilteredMovies(movies);
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (check) => {
    setNoResults(false);
    if (!searchMovie && filteredMovies.length === 0) return;
    const filtered = updateFilteredMovies(savedMovies, searchMovie, check);
    return filtered.length > 0 ? setFilteredMovies(filtered) : setNoResults(true);
  };

  const handleShortMovieChange = (check) => {
    setIsShortMovieChecked(check);
    handleFilter(check);
  };

  const handleResetSearchState = () => {
    setFilteredMovies([]);
    setSearchError(false);
  };

  const handleSearch = () => {
    handleResetSearchState();
    if (!searchMovie) {
      setSearchError(true);
      return;
    }
    handleFilter(isShortMovieChecked, searchMovie);
  };

  return (
    <>
      <Header backgroundColor="#202020" theme={{ default: false }} />
      <main className="saved__container">
        <SeachForm
          setSearchMovie={setSearchMovie}
          onSearch={handleSearch}
          searchQuery={searchMovie}
          setIsShortMovieChecked={setIsShortMovieChecked}
        />
        <FilterCheckbox onCheckboxChange={handleShortMovieChange} isShortMovieChecked={isShortMovieChecked} />
        <MoviesCardList
          movies={filteredMovies}
          isLoading={isLoading}
          onDelete={handleDelete}
          searchError={searchError}
          noResults={noResults}
        />
      </main>
      <Footer />
    </>
  )
}
