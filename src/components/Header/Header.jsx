import React, {useContext} from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';
import NavTab from "../Main/NavTab/NavTab";
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo'

export default function Header({ backgroundColor }) {
  const headerStyle = {
    backgroundColor: backgroundColor,
  };
  const { loggedIn } = useContext(CurrentUserContext);

    return(
    <header style={headerStyle} className="header">
      <div className="header__container">
        <Logo />
        {loggedIn ? <Navigation /> : <NavTab />}
      </div>
    </header>
    )
}
