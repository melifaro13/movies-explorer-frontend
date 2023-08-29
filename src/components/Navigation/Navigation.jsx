import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function Navigation() {
  const {currentUser} = useContext(CurrentUserContext);
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
            <NavLink to="/" className="nav__moovie">Главная</NavLink>
          )}
          <NavLink to="/movies" className="nav__moovie">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="nav__moovie">Сохраненные фильмы</NavLink>
        </div>
        <Link to="/profile" className="nav__profile">{currentUser?.name}</Link>
        {!isMenuOpen && <button type="button" className="nav__burger" onClick={burgerMenu} aria-label='Открыть бургерное меню'></button>}
        {isMenuOpen && <button type="button" className="nav__burger-close" onClick={burgerMenu} aria-label='Закрыть бургерное меню'></button>}
      </nav>
    </>
  );
}
