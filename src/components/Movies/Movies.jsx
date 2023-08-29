import React, { useEffect, useState, useContext } from 'react';

import movieApi from '../../utils/MoviesApi';
import { updateFilteredMovies, findScreenSize } from '../../utils/items';
import useLocalStorage from '../../utils/useLocalStorage';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../context/CurrentUserContext';

import Header from "../Header/Header";
import SeachForm from "../Movies/SearchForm/SeachForm"
import FilterCheckbox from '../Movies/FilterCheckbox/FilterCheckbox';
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies({ showError, onDelete }) {
  const [screenSize, setScreenSize] = useState(findScreenSize(window.innerWidth));
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const { isLoading, setIsLoading } = useContext(CurrentUserContext);
  const [filteredMovies, setFilteredMovies] = useLocalStorage('movies', []);
  const [isShortMovieChecked, setIsShortMovieChecked] = useLocalStorage('isShortMovieChecked', false);
  const [searchMovie, setSearchMovie] = useLocalStorage('searchMovie', '');
  const [displayedMoviesCount, setDisplayedMoviesCount] = useState(screenSize.films);
  const moviesWatch = filteredMovies.slice(0, displayedMoviesCount);


  useEffect(() => {
    setIsLoading(true);
    Promise.all([movieApi.getMovies(), mainApi.getAllMovies()])
      .then(([moviesData, savedMovies]) => {
        const moviesWithSavedFlag = moviesData.map((movie) => {
          const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
          return {
            ...movie,
            isSaved: Boolean(savedMovie),
            _id: savedMovie ? savedMovie._id : null,
          };
        });
        setMovies(moviesWithSavedFlag);
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisplayedMoviesCount(screenSize.films);
  }, [screenSize.films]);

  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newSize = findScreenSize(window.innerWidth);
        setScreenSize(newSize);
        setDisplayedMoviesCount(newSize.films);
      }, 500);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const updatedMovies = filteredMovies.map((filteredMovie) => {
      const correspondingMovie = movies.find((movie) => movie.id === filteredMovie.id);
      if (correspondingMovie) {
        return {
          ...filteredMovie,
          isSaved: correspondingMovie.isSaved || false,
          _id: correspondingMovie._id || null,
        };
      } else {
        return filteredMovie;
      }
    });
    setFilteredMovies(updatedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  const handleSaveButtonClick = (movie) => {
    mainApi
      .addMovies(movie)
      .then((addedMovie) => {
        setMovies((prevMovies) =>
          prevMovies.map((film) =>
            film.id === addedMovie.movieId ? { ...film, isSaved: true, _id: addedMovie._id } : film,
          ),
        );
      })
      .catch((error) => {
        showError(error);
      });
  };

  function handleDelete(movieId) {
    onDelete(movieId);
    setMovies((prev) =>
      prev.map((film) =>
        film._id === movieId ? { ...film, isSaved: false, _id: null, } : film,
      ),
    );
  }

  const handleFilter = (check) => {
    setNoResults(false);
    if (!searchMovie && filteredMovies.length === 0) return;
    const filtered = updateFilteredMovies(movies, searchMovie, check);
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
    handleFilter(isShortMovieChecked);
  };

  const handleLoadMore = () => {
    const newDisplayedCount = displayedMoviesCount + screenSize.addCardsNumber;
    setDisplayedMoviesCount(newDisplayedCount);
  };

  return (
    <>
      <Header backgroundColor="#202020" theme={{ default: false }} />
      <main>
        <SeachForm
        setSearchMovie={setSearchMovie}
         onSearch={handleSearch}
         searchMovie={searchMovie}
         setIsShortMovieChecked={setIsShortMovieChecked}
        />
        <FilterCheckbox onCheckboxChange={handleShortMovieChange} isShortMovieChecked={isShortMovieChecked} />
        <section className="moviescards">
          <MoviesCardList
            movies={moviesWatch}
            searchError={searchError}
            noResults={noResults}
            isLoading={isLoading}
            onSave={handleSaveButtonClick}
            onDelete={handleDelete}
          />
          {filteredMovies.length > displayedMoviesCount && (
            <button className="moviescards__more" onClick={handleLoadMore}>Ещё</button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
