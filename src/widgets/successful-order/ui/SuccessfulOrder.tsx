import { FC } from 'react';
//todo
// import './style.sass';

import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import { Redirect } from 'react-router-dom';

import { Header } from 'widgets/header';
import { Heading } from 'shared/ui/components/Heading';
import { Button } from 'components/Button';

import { ReactComponent as TicketsEmailIcon } from './icons/tickets_email.svg';
import { ReactComponent as TicketsIcon } from './icons/tickets.svg';
import { ReactComponent as ControlerIcon } from './icons/controler.svg';

import { formatNumber } from 'shared/lib/helpers';
import { RateService } from 'features/rate-service/ui';
import { TicketInstruction } from 'entities/ticket-instruction';

export const SuccessfulOrder: FC = () => {
  const {
    userData: { last_name, first_name, patronymic },
  }: any = useSelector((state: RootState) => state.order);

  const { price } = useSelector((state: RootState) => state.seats);

  const totalPrice = formatNumber(price.total);

  return (
    <div className="success-page__content">
      <header className="order-header">
        <div className="order-header__number">№ заказа 285АА</div>
        <div className="order-header__sum">
          сумма <span className="order-header__digits">{totalPrice}</span> ₽
        </div>
      </header>
      <div className="order-information">
        <ul className="ticket-steps__list">
          <TicketInstruction icon={TicketsEmailIcon}>
            билеты будут отправлены на ваш <b>e-mail</b>
          </TicketInstruction>

          <TicketInstruction icon={TicketsIcon}>
            <b>распечатайте</b> и сохраняйте билеты до даты поездки
          </TicketInstruction>

          <TicketInstruction icon={ControlerIcon}>
            <b>предьявите</b> распечатанные билеты при посадке
          </TicketInstruction>
        </ul>
        <div className="success-page__text">
          <Heading size="m" className="order-information__title">
            {first_name} {patronymic || last_name}!
          </Heading>
          <p className="success-page__paragraph">
            Ваш заказ успешно оформлен.
            <br />В ближайшее время с вами свяжется наш оператор для
            подтверждения.
          </p>
          <p className="success-page__paragraph text_accent">
            Благодарим Вас за оказанное доверие и желаем приятного путешествия!
          </p>
        </div>
      </div>
      <footer className="order-footer">
        <RateService />
        <Link to="/">
          <Button classname="success-page__button" size="l">
            Вернуться на главную
          </Button>
        </Link>
      </footer>
    </div>
  );
};
