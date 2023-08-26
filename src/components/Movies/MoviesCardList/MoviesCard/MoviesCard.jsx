import { useLocation } from 'react-router-dom';

export default function MoviesCard({ movie}) {
  const location = useLocation();
  const convertDuration = (number) => {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    return `${hours}ч${minutes}м`;
  };

  const isSavedFilmsPage = location.pathname === '/saved-movies';

  return (
    <li className='movie'>
      <img src={movie.image} className='movie__image' alt={movie.name} />
      <div className='movie__info'>
        <div className='movie__box'>
          <h2 className='movie__title'>{movie.name}</h2>
          {isSavedFilmsPage ? (
            <button type='button' className='movie__button-delete' aria-label='Удалить карточку фильма'></button>
          ) : (
            <button type='button' className={`movie__button-save ${movie.isSaved ? 'movie__button-save_active' : ''}`} aria-label='Сохранить карточку фильма'></button>
          )}
        </div>
        <p className='movie__duration'>{convertDuration(movie.duration)}</p>
      </div>
    </li>
  );
}
