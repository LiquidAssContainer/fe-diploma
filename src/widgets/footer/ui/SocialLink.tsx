import { FC, ReactSVGElement, SVGAttributes } from 'react';

type IconComponent = FC<SVGAttributes<ReactSVGElement>>;

type SocialLinkProps = {
  link: string;
  icon: IconComponent;
};

export const SocialLink: FC<SocialLinkProps> = ({ link, icon: Icon }) => (
  <a className="social__link" href={link} target="_blank" rel="noreferrer">
    <Icon className="social__icon" />
  </a>
);
