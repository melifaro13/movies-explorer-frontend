export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__box">
          <p className="footer__year">© 2023</p>
          <nav className="footer__nav">
            <a className="footer__nav-link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a className="footer__nav-link" href="https://github.com/git-guides" target="_blank" rel="noreferrer">Github</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
