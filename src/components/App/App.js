import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";
import Page404 from "../Page404/Page404";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile"

function App() {
  return (
    <CurrentUserContext.Provider>
      <div className="page">
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
