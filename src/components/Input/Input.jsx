import './style.sass';

import cn from 'classnames';

import { DatePicker } from 'components/DatePicker';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

export const EmailInput = (props) => {
  return <Input {...props} type="email" />;
};

export const DateInput = ({
  size,
  startDate,
  endDate,
  onSelectDate,
  selected,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [value, setValue] = useState('');

  const formatDate = (date) => {
    format(date, 'yyyy-MM-dd');
  };

  const onClick = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const onChangeDate = (item) => {
    const parsed = parseISO(item.target.value);
    setValue(item.target.value);
    onSelectDate(parsed);
  };

  return (
    <div className="date-input__wrapper">
      <Input
        size={size}
        type="date"
        value={value}
        min={startDate && formatDate(startDate)}
        max={endDate && formatDate(endDate)}
        onChange={onChangeDate}
      >
        <button
          className="input__btn input__btn_pick-date"
          onClick={onClick}
          type="button"
        >
          <CalendarIcon className="input__btn_icon" />
        </button>
      </Input>

      {isPickerOpen && (
        <DatePicker
          onSelectDate={onSelectDate}
          selected={selected}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
};

export const LocationInput = (props) => {
  // const testOpts = [
  //   ''
  // ]

  return (
    <Input {...props} type="text">
      <button className="input__btn input__btn_pick-location" type="button">
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
