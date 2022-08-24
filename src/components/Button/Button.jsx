import './style.sass';

import cn from 'classnames';

export const Button = ({
  children,
  size,
  style,
  classname,
  isDisabled = false,
}) => {
  return (
    <button
      className={cn('form__button', classname, {
        [`form__button_size_${size}`]: size,
        [`form__button_style_${style}`]: style,
        form__button_disabled: isDisabled,
      })}
      type="button"
    >
      {children}
    </button>
  );
};
