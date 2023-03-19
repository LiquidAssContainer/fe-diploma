import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Icon } from 'shared/ui/components/Icon';

import { ReactComponent as CheckedIcon } from 'shared/ui/icons/checked.svg';

import './style.sass';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  textSize?: string;
  onChange?: any;
};

export const Checkbox: FC<CheckboxProps> = ({
  className,
  label,
  name,
  value,
  onChange,
  textSize = 'm',
  type = 'checkbox',
  ...props
}) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  const handleChange = (e: ChangeEvent) => {
    field.onChange(e);
    onChange?.(e);
  };

  return (
    <label className="order__checkbox">
      <input
        className={className || 'order__checkbox_input'}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        checked={field.value === value}
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

export const CheckboxSlider: FC<CheckboxProps> = ({ ...props }) => {
  return (
    <div className="input_checkbox_wrapper">
      <Checkbox className="input_checkbox" {...props} />
      <div className="input_checkbox_slider" />
    </div>
  );
};
