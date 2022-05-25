import { FooterContacts } from './FooterContacts';
import { FooterSubscription } from './FooterSubscription';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_contact-info">
        <FooterContacts />
        <FooterSubscription />
      </div>
      <div className="footer_logo_section">
        <div className="logo">Лого</div>
        <button className="scroll_up_btn">
          <img src="/logos/up_arrow.svg" />
        </button>
        <div className="footer_copyright">2018 WEB</div>
      </div>
    </footer>
  );
};
