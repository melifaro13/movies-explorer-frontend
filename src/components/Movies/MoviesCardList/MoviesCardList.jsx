import { useState, useEffect } from 'react';

import Preloader from './Preloader/Preloader';
import MoviesCard from "./MoviesCard/MoviesCard";

export default function MoviesCardList({ filmList }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="moviescards">
      <div className="moviescards__container">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <ul className='moviescards__list'>
                {filmList.map((film, index) => (
                  <MoviesCard key={index} film={film} />
                ))}
            </ul>
            {filmList.length > 14 && (
              <button className="moviescards__more">Ещё</button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
