import './style.sass';

import cn from 'classnames';

import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

export const EmailInput = (props) => {
  return <Input {...props} type="email" />;
};

export const DateInput = (props) => {
  return (
    <Input {...props} type="date" placeholder="ДД/ММ/ГГ">
      <button className="input__btn input__btn_pick-date">
        <CalendarIcon className="input__btn_icon" />
      </button>
    </Input>
  );
};

export const LocationInput = (props) => {
  // const testOpts = [
  //   ''
  // ]

  return (
    <Input {...props} type="text">
      <button className="input__btn input__btn_pick-location">
        <LocationIcon className="input__btn_icon" />
      </button>
    </Input>
  );
};

const Input = ({ children, size, className, ...props }) => {
  return (
    <div
      className={cn('input__container', className, {
        [`input__container_size_${size}`]: size,
      })}
    >
      <input className="form__input" {...props} />
      {children}
    </div>
  );
};
