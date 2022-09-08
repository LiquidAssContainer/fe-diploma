import './style.sass';

import cn from 'classnames';
import { useFormContext, useController } from 'react-hook-form';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';

import { DatePicker } from 'components/DatePicker';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

export const EmailInput = (props) => {
  return <Input {...props} type="email" />;
};

export const DateInput = ({
  name,
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
        name={name}
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
  return (
    <Input {...props} type="text" autocomplete="off">
      <button className="input__btn input__btn_pick-location" type="button">
        <LocationIcon className="input__btn_icon" />
      </button>
    </Input>
  );
};

const Input = ({ children, size, className, name, onChange, ...props }) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  const handleChange = (event) => {
    field.onChange(event);
    onChange?.(event);
  };

  return (
    <div
      className={cn('input__container', className, {
        [`input__container_size_${size}`]: size,
      })}
    >
      <input
        className="form__input"
        {...field}
        {...props}
        value={field.value}
        onChange={handleChange}
      />
      {children}
    </div>
  );
};
