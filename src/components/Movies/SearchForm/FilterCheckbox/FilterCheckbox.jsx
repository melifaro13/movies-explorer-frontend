export default function FilterCheckbox() {
  return (
    <section className="checkbox">
        <label className="checkbox__tumbler">
          <input className="checkbox__check" type="checkbox" />
          <span className="checkbox__slider" />
        </label>
        <p className="checkbox__film">Короткометражки</p>
    </section>
  );
}
