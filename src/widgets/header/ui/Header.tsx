import './style.sass';

import { FC } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import { Logo } from 'shared/ui/components/Logo';
import { useMenuLinks } from 'hooks/useMenuLinks';

export const Header: FC = () => {
  const links = useMenuLinks();
  return (
    <header>
      <div className="logo__wrapper">
        <div className="logo__container">
          <Link to="/" className="logo__link">
            <Logo />
          </Link>
        </div>
      </div>
      <div className="menu-links">
        <ul className="menu-links__list">
          {links.map(({ label, href }) => {
            return (
              <li key={href} className="menu-links__item">
                <Link to={`/#${href}`} className="menu-link">
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};
