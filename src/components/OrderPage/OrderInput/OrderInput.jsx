import './style.sass';

export const OrderInput = ({ label, type, placeholder, name }) => {
  return (
    <div className="order__input_container">
      {label && (
        <label className="order__input_label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className="order__input"
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
