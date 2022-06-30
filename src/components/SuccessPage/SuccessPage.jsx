import './style.sass';

import { Header } from 'components/Header';

import { ReactComponent as TicketsEmailIcon } from 'assets/icons/tickets_email.svg';
import { ReactComponent as TicketsIcon } from 'assets/icons/tickets.svg';
import { ReactComponent as ControlerIcon } from 'assets/icons/controler.svg';
import { ReactComponent as StarIcon } from 'assets/icons/star.svg';
import { Button } from 'components/Button/Button';

const ticketInstructions = [
  {
    Icon: TicketsEmailIcon,
    text: 'билеты будут отправлены на ваш <b>e-mail</b>',
  },
  {
    Icon: TicketsIcon,
    text: 'распечатайте и сохраняйте билеты до даты поездки',
  },
  {
    Icon: ControlerIcon,
    text: 'предьявите распечатанные билеты при посадке',
  },
];

export const SuccessPage = () => {
  return (
    <div className="success-page__container">
      <section className="success-page__header">
        <Header />
        <div className="success-page__header_text hero_content_text text_accent">
          Благодарим вас за заказ!
        </div>
      </section>
      <section className="success-page__content_section">
        <div className="success-page__content">
          <header className="order-header">
            <div className="order-header__number">№ заказа 285АА</div>
            <div className="order-header__sum">
              сумма <span className="order-header__digits">7 760</span> ₽
            </div>
          </header>
          <div className="order-information">
            <ul className="ticket-steps__list">
              {ticketInstructions.map((props) => (
                <TicketInstructionItem {...props} />
              ))}
            </ul>
            <div className="success-page__text">
              <h3 className="header_size_m order-information__title">
                Ирина Эдуардовна!
              </h3>
              <p className="success-page__paragraph">
                Ваш заказ успешно оформлен.
                <br />В ближайшее время с вами свяжется наш оператор для
                подтверждения.
              </p>
              <p className="success-page__paragraph text_accent">
                Благодарим Вас за оказанное доверие и желаем приятного
                путешествия!
              </p>
            </div>
          </div>
          <footer className="order-footer">
            <div className="rate-service">
              <div className="rate-service__label">Оценить сервис</div>
              <ul className="rate-service__stars">
                {[...Array(5)].map(() => (
                  <div className="star__wrapper">
                    <StarIcon className="star" />
                  </div>
                ))}
              </ul>
            </div>
            <Button
              classname="success-page__button"
              // style="transparent-dark"
              size="l"
            >
              Вернуться на главную
            </Button>
          </footer>
        </div>
      </section>
    </div>
  );
};

const TicketInstructionItem = ({ Icon, text }) => {
  return (
    <li className="ticket-steps__item">
      <div className="ticket-step__icon_wrapper">
        <Icon className="ticket-step__icon" />
      </div>
      <div className="ticket-step__text">{text}</div>
    </li>
  );
};
