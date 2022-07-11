import { useMenuLinks } from '../../hooks/useMenuLinks';
import { HashLink as Link } from 'react-router-hash-link';

export const PageHeader = () => {
  const links = useMenuLinks();
  return (
    <header>
      <div className="logo_wrapper">
        <div className="logo_container">
          <div className="logo">Лого</div>
        </div>
      </div>
      <div className="menu-links">
        <ul className="menu-links__list" links={links}>
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
