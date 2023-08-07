import Logo from "../Logo/Logo";

export default function Login() {
  return (
    <main className="login">
      <div className="login__container">
        <Logo />
        <h2 className="login__title">Рады Видеть!</h2>
        <form className="login__form">
          <fieldset className="login__fieldset">
            <label htmlFor="email" className="login__label">E-mail</label>
            <input type="email" id="email" name="email" minLength='4' required className="login__input" />
            <label htmlFor="password" className="login__label">Пароль</label>
            <input type="password" id="password" name="password" minLength='6' required className="login__input" />
          </fieldset>
          <button type="button" className="login__button" aria-label="Войти">Войти</button>
        </form>
        <p className="login__question">Еще не зареристрированы? <a className="login__link" href="/signup">Регистрация</a></p>
      </div>
    </main>
  )
}
