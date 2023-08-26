import Preloader from './Preloader/Preloader';
import MoviesCard from "./MoviesCard/MoviesCard";

export default function MoviesCardList({ movies, isLoading }) {

  return (
    <section className="moviescards">
      <div className="moviescards__container">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <ul className='moviescards__list'>
                {movies.map((movie) => (
                  <MoviesCard key={movie.id || movie.movieId} movie={movie} />
                ))}
            </ul>
            {movies.length > 14 && (
              <button className="moviescards__more">Ещё</button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
