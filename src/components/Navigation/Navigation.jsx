import { Link } from "react-router-dom";
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
     {isMenuOpen && <div className="nav__overlay" onClick={burgerMenu}></div>}
      <nav className={`nav__navigation ${isMenuOpen ? "nav__navigation_active" : ""}`}>
        <div className="nav__box">
          {isMenuOpen && (
            <Link to="/" className="nav__moovie">Главная</Link>
          )}
          <Link to="/movies" className="nav__moovie nav__moovie_active">Фильмы</Link>
          <Link to="/saved-movies" className="nav__moovie">Сохраненные фильмы</Link>
        </div>
        <Link to="/profile" className="nav__profile">Аккаунт</Link>
        {!isMenuOpen && <button type="button" className="nav__burger" onClick={burgerMenu} aria-label='Открыть бургерное меню'></button>}
        {isMenuOpen && <button type="button" className="nav__burger-close" onClick={burgerMenu} aria-label='Закрыть бургерное меню'></button>}
      </nav>
    </>
  );
}
