import React, { useEffect, useState } from 'react';
import filmList from "../../utils/filmList";
import Header from "../Header/Header";
import SeachForm from "../Movies/SearchForm/SeachForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import movieApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';

export default function Movies() {

  return (
    <>
      <Header backgroundColor="#202020" theme={{ default: false }} />
      <main>
        <SeachForm />
        <MoviesCardList filmList={filmList} />
      </main>
      <Footer />
    </>
  );
}
