import { useState, useEffect, useContext, useRef } from 'react';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import CurrentUserContext from '../../context/CurrentUserContext'
import { ErrorAuthMessage } from '../../utils/constants';

import Header from '../Header/Header'

export default function Profile({ onSignOut, onChangeUserInfo, errorMessage, setErrorAuthMessage  }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const { currentUser, isLoading } = useContext(CurrentUserContext);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const { values, handleChange, errors, isValid, setIsValid } = useFormWithValidation();

  const prevNameRef = useRef(name);
  const prevEmailRef = useRef(email);

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
  }, [currentUser])

  useEffect(() => {
    if (errorMessage) {
      setIsProfileChanged(true);
    }
  }, [errorMessage])

  useEffect(() => {
    return () => {
      setErrorAuthMessage('');
      setIsProfileChanged(false);
    };
  }, [setErrorAuthMessage]);

  const handleChangeInput = (e) => {
    setErrorAuthMessage('');
    handleChange(e);
    if (prevNameRef.current.value === currentUser?.name && prevEmailRef.current.value === currentUser?.email) {
      setErrorAuthMessage(ErrorAuthMessage);
    }
  };

  const handleChangeClick = () => {
    setIsProfileChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeUserInfo({
      name: values.name || name,
      email: values.email || email,
    });
    setIsProfileChanged(false);
    setIsValid(false);
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
            {isProfileChanged ? (
            <div className='profile__field-container'>
              <input
                type='text'
                name='name'
                minLength='2'
                value={values.name || name}
                ref={prevNameRef}
                pattern='^[A-Za-zА-Яа-я\s\-]+$'
                onChange={handleChangeInput}
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
            {isProfileChanged ? (
            <div className='profile__field-container'>
              <input
                type='email'
                name='email'
                value={values.email || email}
                ref={prevEmailRef}
                pattern='^\S+@\S+\.\S+$'
                onChange={handleChangeInput}
                className={`profile__field-name ${errors.email}`} />
              <span className='profile__error-message'>{errors.email}</span>
            </div>
            ) : (
                <span className='profile__email-value'>{email}</span>)}
            </div>
          {isProfileChanged ? (
            <>
              <span className='profile__error'>{errorMessage}</span>
              <button
                type='submit'
                disabled={!isValid || errorMessage || isLoading}
                className={`profile__save-button ${!isValid || errorMessage ? 'profile__save-button_disabled' : ''}`}
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
