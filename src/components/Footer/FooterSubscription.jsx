import { ReactComponent as Youtube } from '../../assets/icons/youtube.svg';
import { ReactComponent as Linkedin } from '../../assets/icons/linked_in.svg';
import { ReactComponent as Googleplus } from '../../assets/icons/google_plus.svg';
import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';

export const FooterSubscription = () => {
  const socialNetworks = [
    { icon: Youtube, link: 'https://youtube.com' },
    { icon: Linkedin, link: 'https://youtube.com' },
    { icon: Googleplus, link: 'https://youtube.com' },
    { icon: Twitter, link: 'https://twitter.com' },
    { icon: Facebook, link: 'https://youtube.com' },
  ];

  return (
    <div className="subscription">
      <div className="subscription-form_container">
        <h4 className="footer_header">Подписка</h4>
        <div className="subscription-form_text">Будьте в курсе событий</div>
        <form action="" className="subscribe-form">
          <input
            type="text"
            className="subscribe-form_input"
            placeholder="e-mail"
          />
          <button className="subscribe-form_btn">Отправить</button>
        </form>
      </div>
      <div className="social-networks">
        <h4 className="footer_header">Подписывайтесь на нас</h4>
        <ul className="social-network_list">
          {socialNetworks.map(({ icon: IconComponent, link }) => (
            <li className="social-network_item">
              <a className="social-network_link" href={link} target="_blank">
                <IconComponent className="social-network_icon" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
