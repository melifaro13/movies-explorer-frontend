import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../context/CurrentUserContext'

import { useFormWithValidation } from '../../utils/useFormWithValidation';

import Logo from "../Logo/Logo";

export default function Login({ onSignIn, errorMessage, setErrorAuthMessage }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const { isLoading } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(values.email, values.password, resetForm);
  };

  const handleChangeInput = (e) => {
    setErrorAuthMessage('');
    handleChange(e);
  };

  return (
    <main className="login">
      <div className="login__container">
        <Logo />
        <h2 className="login__title">Рады Видеть!</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <fieldset className="login__fieldset">
            <label htmlFor="email" className="login__label">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              minLength='4'
              required
              pattern='^\S+@\S+\.\S+$'
              className={`login__input ${errors.email}`}
              value={values.email || ''}
              onChange={handleChangeInput}
           />
            <span className="login__error-message">{errors.email}</span>
            <label htmlFor="password" className="login__label">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              minLength='6'
              required
              className={`login__input ${errors.password}`}
              value={values.password || ''}
              onChange={handleChangeInput}
           />
            <span className="login__error-message">{errors.password}</span>
          </fieldset>
          <div className='login__wrapper'>
          <span className='login__error-message_main'>{errorMessage}</span>
            <button
              type="submit"
              className={`login__button ${!isValid || errorMessage ? 'login__button_disabled' : ''}`}
              aria-label="Войти"
              disabled={!isValid || errorMessage || isLoading}>
              Войти</button>
          </div>
        </form>
        <p className="login__question">Еще не зареристрированы? <Link className="login__link" to="/signup">Регистрация</Link></p>
      </div>
    </main>
  )
}
