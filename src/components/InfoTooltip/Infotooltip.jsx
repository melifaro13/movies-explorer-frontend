import done from '../../images/done.svg';

export default function InfoTooltip({ doneMessage }) {
  return (
    <>
      {doneMessage && (
        <div className='popup__container'>
          <img src={done} alt={doneMessage} className="popup__status" />
          <h2 className="popup__message">{doneMessage}</h2>
        </div>
      )}
    </>
  );
}

