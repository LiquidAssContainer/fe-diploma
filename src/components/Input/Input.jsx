import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
import cn from 'classnames';

export const EmailInput = (props) => {
  return <Input {...props} type="email" />;
};

export const DateInput = (props) => {
  return (
    <Input {...props} type="date" placeholder="ДД/ММ/ГГ">
      <button className="input__btn_pick_date">
        <CalendarIcon className="input__bth_icon" />
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
      <button className="input__btn_pick_location">
        <LocationIcon className="input__bth_icon" />
      </button>
    </Input>
  );
};

const Input = ({ children, size, ...props }) => {
  return (
    <div
      className={cn('input__container', {
        input__container_size_s: size === 'small',
      })}
    >
      <input {...props} />
      {children}
    </div>
  );
};
