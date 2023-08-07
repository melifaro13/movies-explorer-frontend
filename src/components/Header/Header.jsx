import { useLocation } from "react-router-dom";
import NavTab from "../Main/NavTab/NavTab";
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo'
import { authPages } from '../../utils/constants';

export default function Header({ backgroundColor }) {
  const headerStyle = {
    backgroundColor: backgroundColor,
  };
  const location = useLocation();
  const isAuthPage = authPages.includes(location.pathname);

    return(
    <header style={headerStyle} className="header">
      <div className="header__container">
        <Logo />
        {isAuthPage ? <Navigation /> : <NavTab />}
      </div>
    </header>
    )
}
