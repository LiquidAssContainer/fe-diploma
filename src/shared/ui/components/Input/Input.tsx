import './style.sass';

import cn from 'classnames';
import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react';
import { useFormContext, useController, ValidationRule } from 'react-hook-form';
import { format, parseISO } from 'date-fns';

import { DatePicker } from 'components/DatePicker';

import { ReactComponent as LocationIcon } from 'shared/ui/icons/location.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

const parseDate = (date: string) => date && parseISO(date);
const formatDate = (date: any) => format(date, 'yyyy-MM-dd');

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  onChange?: any;
  isChecked: boolean;
  pattern: ValidationRule<RegExp>;
  isValid: boolean;
  style: 'bordered' | undefined;
};

export const Input: FC<InputProps> = ({
  className,
  style,
  name,
  onChange,
  value,
  required,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  placeholder,
  size,
  isValid = true,
  ...props
}) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    rules: { required, minLength, maxLength, min, max, pattern },
  });

  const handleChange = (e: ChangeEvent) => {
    field.onChange(e);
    onChange?.(e);
  };

  return (
    <input
      className={cn('order__input', className, {
        invalid: !isValid,
        order__input: style === 'bordered',
        form__input: style !== 'bordered',
        [`order__input_size_${size}`]: size,
      })}
      {...field}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value || field.value}
      // checked={isChecked || (type === 'checkbox' && field.value)}
      onChange={handleChange}
      {...props}
    />
  );
};

export const EmailInput: FC<any> = ({ size, ...props }) => {
  return (
    <InputContainer size={size}>
      <Input {...props} type="email" />
    </InputContainer>
  );
};

export const LocationInput: FC<any> = ({ size, ...props }) => {
  return (
    <InputContainer size={size}>
      <Input type="text" autoComplete="off" {...props} />
      <button className="input__btn input__btn_pick-location" type="button">
        <LocationIcon className="input__btn_icon" />
      </button>
    </InputContainer>
  );
};

export const InputContainer: FC<any> = ({ children, size }) => {
  return (
    <div
      className={cn('input__container', {
        [`input__container_size_${size}`]: size,
      })}
    >
      {children}
    </div>
  );
};
