import { FC, ReactSVGElement, SVGAttributes } from 'react';
import cn from 'classnames';

export type IconComponent = FC<SVGAttributes<ReactSVGElement>>;

type IconProps = {
  wrapperClassName?: string;
  iconClassName?: string;
  icon: IconComponent;
};

export const Icon: FC<IconProps> = ({
  wrapperClassName,
  iconClassName = '',
  icon: Icon,
}) => {
  return (
    <div className={cn('icon__wrapper_tmp', wrapperClassName)}>
      <Icon className={cn('icon', iconClassName)} />
    </div>
  );
};
