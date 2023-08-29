import Preloader from './Preloader/Preloader';
import MoviesCard from "./MoviesCard/MoviesCard";

export default function MoviesCardList({ movies, searchError, isLoading, noResults, onSave, onDelete }) {

  return (
    <div className="moviescards__container">
      {isLoading && <Preloader />}
      {searchError && <p className='moviescards__error'>Нужно ввести ключевое слово!</p>}
      {noResults && !searchError && <p className='moviescards__not-found'>Ничего не найдено!</p>}
      {!isLoading && !searchError && !noResults && (
        <ul className='moviescards__list'>
            {movies.map((movie) => (
              <MoviesCard key={movie.id || movie.movieId} movie={movie} onSave={onSave} onDelete={onDelete} />
            ))}
        </ul>
      )}
    </div>
  );
}
