export default function SeachForm({ onSearch, searchMovie, setSearchMovie }) {

  const handleSeachSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleSeachChange = (event) => {
    setSearchMovie(event.target.value);
  };

  return (
    <section className="seachform">
      <div className="seachform__container">
        <form className="seachform__form" noValidate autoComplete='off' onSubmit={handleSeachSubmit}>
          <input
            className="seachform__input"
            type="text"
            minLength="2"
            required
            placeholder="Фильм"
            value={searchMovie}
            onChange={handleSeachChange}
            autoComplete='nope'
          />
          <hr className="searchform__line" />
          <button type="submit" className="seachform__button" aria-label="Запустить поиск"></button>
        </form>
      </div>
    </section>
  );
}
