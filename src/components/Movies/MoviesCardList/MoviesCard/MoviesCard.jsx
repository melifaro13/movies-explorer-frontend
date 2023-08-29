import { useLocation } from 'react-router-dom';
import { MovieApi_BASE_URL } from '../../../../utils/constants';

export default function MoviesCard({ movie, onSave, onDelete }) {

  const convertDuration = (number) => {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    return `${hours}ч ${minutes}м`;
  };

  const handleSaveButtonClick = () => {
    if (movie.isSaved) {
      onDelete(movie._id);
    } else {
      onSave(movie);
    }
  };

  const handleDeleteButtonClick = () => onDelete(movie._id);

  const location = useLocation();
  const isSavedFilmsPage = location.pathname === '/saved-movies';

  return (
    <li className='movie'>
      <a href={`${movie.trailerLink}`} className='movie__link' target='_blank' rel='noreferrer'>
       <img src={isSavedFilmsPage ? `${movie.image}` : `${MovieApi_BASE_URL}${movie.image.url}`} className='movie__image' alt={movie.nameRU} />
      </a>
      <div className='movie__info'>
        <div className='movie__box'>
          <h2 className='movie__title'>{movie.nameRU}</h2>
          {isSavedFilmsPage ? (
            <button
              type='button'
              className='movie__button-delete'
              aria-label='Удалить карточку фильма'
              onClick={handleDeleteButtonClick}
              >
              </button>
          ) : (
            <button
              type='button'
              className={`movie__button-save ${movie.isSaved ? 'movie__button-save_active' : ''}`}
              aria-label='Сохранить карточку фильма'
              onClick={handleSaveButtonClick}>
              </button>
          )}
        </div>
        <p className='movie__duration'>{convertDuration(movie.duration)}</p>
      </div>
    </li>
  );
}
