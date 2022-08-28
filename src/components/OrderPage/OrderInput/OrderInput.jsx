import { Icon } from '../TicketDetails/TicketDetails';
import './style.sass';
import { ReactComponent as CheckedIcon } from 'assets/icons/checked.svg';

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
        id={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export const OrderCheckboxInput = ({ label, name, type = 'checkbox' }) => {
  return (
    <label className="order__checkbox">
      <input className="order__checkbox_input" type={type} name={name} />
      <div className="order__checkbox_input_box">
        <Icon
          wrapperClassName="order__checkbox_input_checked-icon"
          icon={CheckedIcon}
        />
      </div>
      <div className="order__checkbox_text">{label}</div>
    </label>
  );
};
