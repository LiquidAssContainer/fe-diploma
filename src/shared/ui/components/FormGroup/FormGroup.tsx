// import './style.sass';

import { FC, PropsWithChildren } from 'react';

export const FormGroup: FC<PropsWithChildren> = ({ children }) => (
  <div className="order__input_container">{children}</div>
);
