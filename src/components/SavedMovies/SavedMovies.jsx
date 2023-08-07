import filmList from "../../utils/filmListSaved.json";
import Header from '../Header/Header'
import SeachForm from '../Movies/SearchForm/SeachForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function SavedMovies() {
  return (
    <>
      <Header backgroundColor="#202020" theme={{ default: false }} />
      <main className="saved__container">
        <SeachForm />
        <MoviesCardList filmList={filmList} />
      </main>
      <Footer />
    </>
  )
}
