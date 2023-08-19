import { useState, useEffect, useContext } from 'react';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import CurrentUserContext from '../../context/CurrentUserContext'

import Header from '../Header/Header'

export default function Profile({ onSignOut, onChangeUserInfo, errorMessage, setErrorAuthMessage  }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const { currentUser, isLoading } = useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
  }, [currentUser])

  useEffect(() => {
    if (errorMessage) {
      setIsEditing(true);
    }
  }, [errorMessage])

  useEffect(() => {
    return () => {
      setErrorAuthMessage('');
      setIsEditing(false);
    };
  }, [setErrorAuthMessage]);

  const handleChangeInput = (e) => {
    setErrorAuthMessage('');
    handleChange(e);
    const updatedName = e.target.name === 'name' ? e.target.value : values.name;
    const updatedEmail = e.target.name === 'email' ? e.target.value : values.email;
    if (updatedName === currentUser?.name && updatedEmail === currentUser?.email) {
      setErrorAuthMessage('Такие данные уже используются. Измените данные.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeUserInfo({
      name: values.name || name,
      email: values.email || email,
    });
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleSaveClick = () => {
  //   setIsEditing(false);
  // };

  return (
    <>
      <Header backgroundColor="#202020" theme={{ default: false }} />
      <form className='profile' onSubmit={handleSubmit}>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет, {currentUser?.name}!</h2>
          <div className='profile__name'>
            <label htmlFor='name' className='profile__name-label'>
              Имя
            </label>
            {isEditing ?
            <input
              type='text'
              name='name'
              minLength='2'
              value={values.name || name}
              onChange={handleChangeInput}
              className={`profile__field-name ${errors.name}`} /> :
              <span className='profile__name-value'>{name}</span>}
          </div>
          <div className='profile__email'>
            <label htmlFor='email' className='profile__email-label'>
              E-mail
            </label>
            {isEditing ?
            <input
              type='email'
              name='email'
              value={values.email || email}
              onChange={handleChangeInput}
              className={`profile__field-name ${errors.email}`} /> :
              <span className='profile__email-value'>{email}</span>}
          </div>
          {isEditing ? (
            <>
              <span className='profile__error'>При обновлении профиля произошла ошибка.</span>
              <button
                type='submit'
                className={`profile__save-button ${!isValid || errorMessage ? 'profile__save-button_disabled' : ''}`}
                disabled={!isValid || errorMessage || isLoading}
                aria-label='Сохранить данные'>
                Сохранить
              </button>
            </>
          ) : (
            <>
              <button
                type='button'
                className='profile__button-edit'
                href='/'
                onClick={handleEditClick}
                aria-label='Редактировать профиль'>
                Редактировать
              </button>
              <button
                type='button'
                className='profile__button-exit'
                href='/logout'
                aria-label='Выйти из аккаунта'
                onClick={onSignOut}
                disabled={isLoading}>
                Выйти из аккаунта
              </button>
            </>
          )}
        </div>
      </form>
    </>
  )
}
