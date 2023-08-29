import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import CurrentUserContext from '../context/CurrentUserContext';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const { loggedIn } = useContext(CurrentUserContext);
  return loggedIn ? <Component {...props} /> : <Navigate to='/' replace />;
};

const AuthElement = ({ element: Component, ...props }) => {
  const { loggedIn } = useContext(CurrentUserContext);
  return !loggedIn ? <Component {...props} /> : <Navigate to='/movies' replace />;
};

export { ProtectedRouteElement, AuthElement };
