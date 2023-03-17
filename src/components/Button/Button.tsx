import './style.sass';

import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: string;
  styleName?: string;
  classname: string;
};

export const Button: FC<ButtonProps> = ({
  children,
  size,
  styleName,
  classname,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      className={cn('form__button', classname, {
        [`form__button_size_${size}`]: size,
        [`form__button_style_${styleName}`]: styleName,
        form__button_disabled: disabled,
      })}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
