import { useState, useEffect, useContext } from 'react';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import CurrentUserContext from '../../context/CurrentUserContext'
import { ErrorAuthMessage } from '../../utils/constants';

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

  const handleChangeInfo = (e) => {
    setErrorAuthMessage('');
    handleChange(e);
    const updatedName = e.target.name === 'name' ? e.target.value : values.name;
    const updatedEmail = e.target.name === 'email' ? e.target.value : values.email;
    if (updatedName === currentUser?.name && updatedEmail === currentUser?.email) {
      setErrorAuthMessage(ErrorAuthMessage);
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

  const handleChangeClick = () => {
    setIsEditing(true);
  };

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
            {isEditing ? (
            <div className='profile__field-container'>
              <input
                type='text'
                name='name'
                minLength='2'
                value={values.name || name}
                onChange={handleChangeInfo}
                className={`profile__field-name ${errors.name}`} />
              <span className='profile__error-message'>{errors.name}</span>
            </div>
            ) : (
              <span className='profile__name-value'>{name}</span>)}
          </div>
          <div className='profile__email'>
            <label htmlFor='email' className='profile__email-label'>
              E-mail
            </label>
            {isEditing ? (
            <div className='profile__field-container'>
              <input
                type='email'
                name='email'
                value={values.email || email}
                onChange={handleChangeInfo}
                className={`profile__field-name ${errors.email}`} />
              <span className='profile__error-message'>{errors.email}</span>
            </div>
            ) : (
                <span className='profile__email-value'>{email}</span>)}
            </div>
          {isEditing ? (
            <>
              <span className='profile__error'>{errorMessage}</span>
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
                onClick={handleChangeClick}
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
