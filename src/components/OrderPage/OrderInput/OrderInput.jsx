import './style.sass';

import { Icon } from '../TicketDetails/TicketDetails';
import { ReactComponent as CheckedIcon } from 'assets/icons/checked.svg';
import { Input } from 'components/Input';
import cn from 'classnames';

export const OrderInput = ({
  className,
  label,
  type,
  placeholder,
  name,
  ...props
}) => {
  return (
    <div className="order__input_container">
      {label && (
        <label className="order__input_label" htmlFor={name}>
          {label}
        </label>
      )}
      <Input
        className={cn('order__input', className)}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        {...props}
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
      <Input
        className="order__checkbox_input"
        type={type}
        name={name}
        {...props}
      />
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
