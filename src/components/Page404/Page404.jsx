import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <main className="page404">
      <div className="page404_container">
        <h2 className="page404__title">404</h2>
        <p className="page404__subtitle">Страница не найдена</p>
        <Link className="page404__link" to={-1}>Назад</Link>
      </div>
    </main>
  )
}
