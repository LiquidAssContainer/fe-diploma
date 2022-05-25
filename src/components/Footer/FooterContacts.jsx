import { ReactComponent as Phone } from '../../assets/icons/phone.svg';
import { ReactComponent as Mail } from '../../assets/icons/mail.svg';
import { ReactComponent as Skype } from '../../assets/icons/skype.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';

export const FooterContacts = () => {
  const contacts = [
    { icon: Phone, text: '8 (800) 000 00 00' },
    { icon: Mail, text: 'inbox@mail.ru' },
    { icon: Skype, text: 'tu.train.tickets' },
    { icon: Location, text: 'г. Москва\nул. Московская\u00A027-35\n555 555' },
  ];

  return (
    <div className="contacts">
      <h4 className="footer_header">Свяжитесь с нами</h4>
      <ul className="contact_list">
        {contacts.map(({ icon: IconComponent, text }) => (
          <li className="contact_item">
            <div className="contact_icon_wrapper">
              <IconComponent className="contact_icon" />
            </div>
            <div className="contact_text">{text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
