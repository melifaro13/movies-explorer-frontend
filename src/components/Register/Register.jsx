import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import Logo from "../Logo/Logo";

export default function Register({ onSignUp, errorMessage, setErrorAuthMessage }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const { isLoading } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(values.name, values.email, values.password, resetForm);
  };

  const handleChangeInput = (e) => {
    setErrorAuthMessage('');
    handleChange(e);
  };

  return (
    <main className="register">
      <div className="register__container">
        <Logo />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <fieldset className="register__fieldset">
            <label htmlFor="name" className="register__label">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              minLength='2'
              required
              className={`register__input ${errors.name}`}
              value={values.name || ''}
              onChange={handleChangeInput}
              />
            <span className="register__error-message">{errors.name}</span>
            <label htmlFor="email" className="register__label">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              minLength='4'
              required
              className={`register__input ${errors.email}`}
              value={values.email || ''}
              onChange={handleChangeInput}
              />
            <span className="register__error-message">{errors.email}</span>
            <label htmlFor="password" className="register__label">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              minLength='6'
              required
              className={`register__input ${errors.password}`}
              value={values.password || ''}
              onChange={handleChangeInput} />
            <span className="register__error-message">{errors.password}</span>
          </fieldset>
          <div className='register__wrapper'>
            <span className='register__error-message_main'>{errorMessage}</span>
            <button
              type="submit"
              className={`register__button ${!isValid || errorMessage ? "register__button_disabled" : ''}`}
              aria-label="Зарегистрироваться"
              disabled={!isValid || errorMessage || isLoading}
              >Зарегистрироваться</button>
          </div>
        </form>
        <p className="register__question">Уже зарегистрированы? <Link className='register__link' to='/signin'>Войти</Link></p>
      </div>
    </main>
  )
}
