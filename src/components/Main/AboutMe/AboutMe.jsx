import myPhoto from '../../../images/my-photo.jpg';

export default function AboutMe() {
  return (
    <section className="me">
      <div className="me__container">
        <h2 className="me__about">Студент</h2>
        <div className="me__box">
          <div className="me__info">
            <h2 className="me__name">Андрей</h2>
            <h3 className="me__profession">Фронтенд-разработчик, 36 лет</h3>
            <p className="me__biography">Я родился и живу в Санкт-Петербурге, закончил факультет радиосвязи СПбГУТ им. профессора М.А. Бонч-Бруевича. Люблю кататься на сноуборде, увлекаюсь футболом. Работаю заместителем генерального директора в Научно техническом центре Ядерно-физические исследования.</p>
            <p className="me__git">Github</p>
          </div>
          <img className="me__photo" src={myPhoto} alt="Моя фотография" />
        </div>
      </div>
    </section>
  );
}
