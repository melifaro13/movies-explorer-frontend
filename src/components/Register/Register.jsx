import Logo from "../Logo/Logo";

export default function Register() {
  return (
    <main className="register">
      <div className="register__container">
        <Logo />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form">
          <fieldset className="register__fieldset">
            <label htmlFor="name" className="register__label">Имя</label>
            <input type="text" id="name" name="name" minLength='2' required className="register__input" />
            <label htmlFor="email" className="register__label">E-mail</label>
            <input type="email" id="email" name="email" minLength='4' required className="register__input" />
            <label htmlFor="password" className="register__label">Пароль</label>
            <input type="password" id="password" name="password" minLength='6' required className="register__input register__input_type_error" />
            <span className="register__error-message">Что-то пошло не так...</span>
          </fieldset>
          <button type="button" className="register__button" aria-label="Зарегистрироваться">Зарегистрироваться</button>
        </form>
        <p className="register__question">Уже зарегистрированы? <a className="register__link" href="/signin">Войти</a></p>
      </div>
    </main>
  )
}
