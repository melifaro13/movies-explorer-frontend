import cancel from '../../images/cancel.svg';

export default function ErrorTooltip({ errorMessage }) {
  return (
    <>
      {errorMessage && (
        <div className='error-popup__container'>
          <img src={cancel} alt={errorMessage} className="error-popup__status" />
          <h2 className="error-popup__message">{errorMessage}</h2>
        </div>
      )}
    </>
  );
}
