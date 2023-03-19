import { FC, LabelHTMLAttributes, PropsWithChildren } from 'react';

type LabelProps = PropsWithChildren & LabelHTMLAttributes<HTMLLabelElement>;

export const Label: FC<LabelProps> = ({ children, ...props }) => (
  <label className="order__input_label" {...props}>
    {children}
  </label>
);
