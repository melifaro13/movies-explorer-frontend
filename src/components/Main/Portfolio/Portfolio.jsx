export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__about">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a className="portfolio__link" target="_blank" rel="noreferrer" href="https://github.com/melifaro13/how-to-learn">Статичный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" target="_blank" rel="noreferrer" href="https://github.com/melifaro13/russian-travel">Адаптивный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" target="_blank" rel="noreferrer" href="https://github.com/melifaro13/react-mesto-api-full-gha">Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
