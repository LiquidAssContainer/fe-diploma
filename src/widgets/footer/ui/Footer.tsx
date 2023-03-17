import './style.sass';

import { FC } from 'react';

import { FooterContacts } from './FooterContacts';

import { SocialLink } from './SocialLink';

import { SubscriptionForm } from 'features/subscription/ui/SubscriptionForm';
import { Logo } from 'shared/ui/components/Logo';

import { ReactComponent as UpArrowIcon } from 'assets/icons/up_arrow.svg';
import { ReactComponent as YouTube } from './icons/youtube.svg';
import { ReactComponent as LinkedIn } from './icons/linked_in.svg';
import { ReactComponent as GooglePlus } from './icons/google_plus.svg';
import { ReactComponent as Twitter } from './icons/twitter.svg';
import { ReactComponent as Facebook } from './icons/facebook.svg';

const socialNetworks = [
  { icon: YouTube, link: 'https://youtube.com' },
  { icon: LinkedIn, link: 'https://ru.linkedin.com/' },
  { icon: GooglePlus, link: 'https://google.com' },
  { icon: Twitter, link: 'https://twitter.com' },
  { icon: Facebook, link: 'https://facebook.com' },
];

const ScrollUpButton: FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <button className="button_scroll-up" onClick={handleClick}>
      <UpArrowIcon />
    </button>
  );
};

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contacts">
      <div className="footer__contacts">
        <FooterContacts />
        <div className="subscription">
          <div className="subscription__form_container">
            <h4 className="footer__header header_size_s">Подписка</h4>
            <div className="subscription__text">Будьте в курсе событий</div>
            <SubscriptionForm />
          </div>
          <div className="socials">
            <h4 className="footer__header header_size_s">
              Подписывайтесь на нас
            </h4>
            <ul className="socials__list">
              {socialNetworks.map((props, i) => (
                <li key={i} className="socials__item">
                  <SocialLink {...props} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__logo_section_wrapper">
        <div className="footer__logo_section">
          <Logo />
          <ScrollUpButton />
          <div className="footer__copyright">© {currentYear} WEB</div>
        </div>
      </div>
    </footer>
  );
};
