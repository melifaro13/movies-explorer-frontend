import filmList from "../../utils/filmList";
import Header from "../Header/Header";
import SeachForm from "../Movies/SearchForm/SeachForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

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
