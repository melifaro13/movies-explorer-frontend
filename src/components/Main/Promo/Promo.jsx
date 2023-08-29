import promoLogo from '../../../images/promo-logo.svg';

export default function Promo() {

  const handleLinkClick = (e) => {
    e.preventDefault();
    document.querySelector(e.target.hash).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__box">
          <h1 className="promo__title">Учебный проект студента факультета <span className='promo__word'>Веб-разработки</span>.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a className="promo__link" href="#project" onClick={handleLinkClick}>Узнать больше</a>
        </div>
        <img className="promo__logo" src={promoLogo} alt="Логотип" />
      </div>
    </section>
  );
}
