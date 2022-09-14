import './style.sass';

import { Icon } from '../TicketDetails/TicketDetails';
import { ReactComponent as CheckedIcon } from 'assets/icons/checked.svg';
import { Input } from 'components/Input';

export const OrderInput = ({ label, type, placeholder, name, ...props }) => {
  return (
    <div className="order__input_container">
      {label && (
        <label className="order__input_label" htmlFor={name}>
          {label}
        </label>
      )}
      <Input
        className="order__input"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export const OrderCheckboxInput = ({
  label,
  name,
  textSize = 'm',
  type = 'checkbox',
  ...props
}) => {
  return (
    <label className="order__checkbox">
      <Input className="order__checkbox_input" type={type} name={name} />
      <div className="order__checkbox_input_box">
        <Icon
          wrapperClassName="order__checkbox_input_checked-icon"
          icon={CheckedIcon}
        />
      </div>
      <div
        className={`order__checkbox_text order__checkbox_text_size_${textSize}`}
      >
        {label}
      </div>
    </label>
  );
};
