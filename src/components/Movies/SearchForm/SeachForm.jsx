import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

export default function SeachForm() {
  return (
    <section className="seachform">
      <div className="seachform__container">
        <form className="seachForm__form">
          <input className="seachForm__input" type="text" minLength="2" required placeholder="Фильм" />
          <hr className="searchForm__line" />
          <button type="submit" className="searchForm__button" aria-label="Запустить поиск"></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}
