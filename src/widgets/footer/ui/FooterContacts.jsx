import { ReactComponent as Phone } from './icons/phone.svg';
import { ReactComponent as Mail } from './icons/mail.svg';
import { ReactComponent as Skype } from './icons/skype.svg';
import { ReactComponent as Location } from 'shared/ui/icons/location.svg';

export const FooterContacts = () => {
  const contacts = [
    { icon: Phone, text: '8 (800) 000 00 00' },
    { icon: Mail, text: 'inbox@mail.ru' },
    { icon: Skype, text: 'tu.train.tickets' },
    {
      icon: Location,
      text: 'г. Москва,\nул. Московская\u00A027-35,\n555\u00A0555',
    },
  ];

  return (
    <div className="contacts">
      <h4 className="footer__header header_size_s">Свяжитесь с нами</h4>
      <ul className="contacts__list">
        {contacts.map(({ icon: IconComponent, text }, i) => (
          <li key={i} className="contacts__item">
            <div className="contact__icon_wrapper">
              <IconComponent className="contact__icon_content" />
            </div>
            <div className="contact__text">{text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
