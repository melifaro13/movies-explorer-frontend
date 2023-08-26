import React, { useEffect, useState, useContext } from 'react';

import Header from "../Header/Header";
import SeachForm from "../Movies/SearchForm/SeachForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import movieApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function Movies({ showError }) {

  const [movies, setMovies] = useState([]);
  const { isLoading, setIsLoading } = useContext(CurrentUserContext);


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

  return (
    <>
      <Header backgroundColor="#202020" theme={{ default: false }} />
      <main>
        <SeachForm />
        <MoviesCardList
          isLoading={isLoading}
          movies={movies}
        />
      </main>
      <Footer />
    </>
  );
}
