import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";
import { AuthElement, ProtectedRouteElement } from '../../utils/ProtectedRoute';
import Page404 from "../Page404/Page404";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import InfoTooltip from '../InfoTooltip/Infotooltip';
import ErrorTooltip from '../ErrorTooltip/ErrorTooltip';
import { useDoneMessageHandling } from '../../utils/useDoneMessageHandling'
import { useErrorMessageHandling } from '../../utils/useErrorMessageHandling';
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import { SucsessChangeInfo } from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAuthMessage, setErrorAuthMessage] = useState("");
  const [errorCancelMessage, showErrorMessage] = useErrorMessageHandling();
  const [doneMessage, showDoneMessage] = useDoneMessageHandling();
  const navigate = useNavigate();

  useEffect(() => {
    auth.getToken()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  const handleSuccessAuthorization = (res, resetForm) => {
    setErrorAuthMessage("");
    resetForm();
    setLoggedIn(true);
    setCurrentUser(res);
    navigate("/movies", { replace: true });
  };

  function handleSignUp(name, email, password, resetForm) {
    setIsLoading(true);
    auth.register(name, email, password)
      .then((res) => {
        handleSuccessAuthorization(res, resetForm);
      })
      .catch((err) => {
        setErrorAuthMessage(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSignIn(email, password, resetForm) {
    setIsLoading(true);
    auth.login(email, password)
      .then((res) => {
        console.log(res);
        handleSuccessAuthorization(res, resetForm);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setErrorAuthMessage(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogOut() {
    setIsLoading(true);
    auth.logout()
      .catch((error) => showErrorMessage(error))
      .finally(() => setIsLoading(false));
    localStorage.clear();
    setLoggedIn(false);
  }

  function handleChangeUserInfo(newUserInfo) {
    setIsLoading(true);
    mainApi
      .updateUserInfo(newUserInfo)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        showDoneMessage(SucsessChangeInfo);
      })
      .catch((err) => {
        setErrorAuthMessage(err);
      })
      .finally(() => setIsLoading(false));
  }

  const handleDeleteButtonClick = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {})
      .catch((error) => {
        showErrorMessage(error);
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, loggedIn, isLoading, setIsLoading }}
    >
      <div className="page">
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route
            path="/signup"
            element={
              <AuthElement
                element={Register}
                onSignUp={handleSignUp}
                errorMessage={errorAuthMessage}
                setErrorAuthMessage={setErrorAuthMessage}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <AuthElement
                element={Login}
                onSignIn={handleSignIn}
                errorMessage={errorAuthMessage}
                setErrorAuthMessage={setErrorAuthMessage}
              />
            }
          />
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                showError={showErrorMessage}
                onDelete={handleDeleteButtonClick}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                showError={showErrorMessage}
                onDelete={handleDeleteButtonClick}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                onSignOut={handleLogOut}
                onChangeUserInfo={handleChangeUserInfo}
                errorMessage={errorAuthMessage}
                setErrorAuthMessage={setErrorAuthMessage}
              />
            }
          />
        </Routes>
        <ErrorTooltip errorMessage={errorCancelMessage} />
        <InfoTooltip doneMessage={doneMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
