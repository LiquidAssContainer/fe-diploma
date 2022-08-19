import './style.sass';

import { ReactComponent as UpArrowIcon } from '../../assets/icons/up_arrow.svg';

import { FooterContacts } from './FooterContacts';
import { FooterSubscription } from './FooterSubscription';

export const Footer = () => {
  return (
    <footer className="footer" id="contacts">
      <div className="footer__contacts">
        <FooterContacts />
        <FooterSubscription />
      </div>
      <div className="footer__logo_section_wrapper">
        <div className="footer__logo_section">
          <div className="logo">Лого</div>
          <button className="button_scroll-up">
            <UpArrowIcon />
            {
              //todo
            }
          </button>
          <div className="footer__copyright">2018 WEB</div>
        </div>
      </div>
    </footer>
  );
};
