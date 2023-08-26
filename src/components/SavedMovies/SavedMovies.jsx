import Header from '../Header/Header'
import SeachForm from '../Movies/SearchForm/SeachForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

//import mainApi from '../../utils/MainApi';
//import { useState, useEffect, useContext } from 'react';
//import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function SavedMovies({ showError }) {

  //const { isLoading, setIsLoading } = useContext(CurrentUserContext);

  // useEffect(() => {
  //   setIsLoading(true);
  //   mainApi
  //     .getAllMovies()
  //     .then((movies) => {
  //       setSavedMovies(movies);
  //       setFilteredMovies(movies);
  //     })
  //     .catch((error) => {
  //       showError(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Header backgroundColor="#202020" theme={{ default: false }} />
      <main className="saved__container">
        <SeachForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  )
}
