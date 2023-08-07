import { useState } from 'react';

import Header from '../Header/Header'

export default function Profile() {

  const [name, setName] = useState('Андрей');
  const [email, setEmail] = useState('yandex@yandex.ru');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Header backgroundColor="#202020" theme={{ default: false }} />
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>{`Привет, ${name}!`}</h2>
          <div className='profile__name'>
            <label htmlFor='name' className='profile__name-label'>
              Имя
            </label>
            {isEditing ? <input type='text' name='name' minLength='2' value={name} onChange={handleNameChange} className='profile__field-name' /> : <span className='profile__name-value'>{name}</span>}
          </div>
          <div className='profile__email'>
            <label htmlFor='email' className='profile__email-label'>
              E-mail
            </label>
            {isEditing ? <input type='email' name='email' value={email} onChange={handleEmailChange} className='profile__field-email' /> : <span className='profile__email-value'>{email}</span>}
          </div>
          {isEditing ? (
            <>
              <span className='profile__error'>При обновлении профиля произошла ошибка.</span>
              <button type='button' className='profile__save-button profile__save-button_disabled' handler={handleSaveClick} aria-label='Сохранить данные'>
                Сохранить
              </button>
            </>
          ) : (
            <>
              <button type='button' className='profile__button-edit' href='/' onClick={handleEditClick} aria-label='Редактировать профиль'>
                Редактировать
              </button>
              <button type='button' className='profile__button-exit' href='/signout' aria-label='Выйти из аккаунта'>
                Выйти из аккаунта
              </button>
            </>
          )}
        </div>
      </section>
    </>
  )
}
