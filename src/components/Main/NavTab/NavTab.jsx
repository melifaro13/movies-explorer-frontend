import { Link } from "react-router-dom";

export default function NavTab() {
  return (
    <nav className="nav-tab__navigation">
      <Link to="/signup" className="nav-tab__registration">
          Регистрация
      </Link>
      <Link to="/signin" className="nav-tab__entrance">
          Войти
      </Link>
    </nav>
  );
}
