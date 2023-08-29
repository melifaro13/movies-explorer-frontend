export default function FilterCheckbox({ onCheckboxChange, isShortMovieChecked }) {
  const handleChange = (e) => onCheckboxChange(e.target.checked);

  return (
    <section className="checkbox">
      <div className="checkbox__container">
        <label className="checkbox__tumbler">
          <input
            className="checkbox__check"
            type="checkbox"
            onChange={handleChange}
            checked={isShortMovieChecked}
          />
          <span className="checkbox__slider" />
        </label>
        <p className="checkbox__film">Короткометражки</p>
      </div>
    </section>
  );
}
