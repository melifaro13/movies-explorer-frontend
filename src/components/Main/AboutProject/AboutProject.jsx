export default function AboutProject() {
  return (
    <section className='project' id='project'>
      <div className='project__container'>
        <h2 className='project__about'>О проекте</h2>
        <div className='project__box'>
          <div className='project__info'>
            <h3 className='project__title'>Дипломный проект включал 5 этапов</h3>
            <p className='project__subtitle'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className='project__info'>
            <h3 className='project__title'>На выполнение диплома ушло 5 недель</h3>
            <p className='project__subtitle'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='project__time-box'>
          <div className='project__time'>
            <h4 className='project__time-title'>1 неделя</h4>
            <p className='project__time-subtitle'>Back-end</p>
          </div>
          <div className='project__time'>
            <h4 className='project__time-title project__time-title_type_grey'>4 недели</h4>
            <p className='project__time-subtitle'>Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}
