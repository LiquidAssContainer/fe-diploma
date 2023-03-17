import './style.sass';

import { createElement, FC, PropsWithChildren } from 'react';
import cn from 'classnames';

const tagsBySize = {
  m: 'h3',
  s: 'h4',
  xs: 'h4',
};

type HeadingProps = PropsWithChildren & {
  size: 'm' | 's' | 'xs';
  className: string;
};

export const Heading: FC<HeadingProps> = ({ size, className, children }) => {
  const elementTag = tagsBySize[size];

  return createElement(
    elementTag,
    { className: cn(`header_size_${size}`, className) },
    children,
  );
};
