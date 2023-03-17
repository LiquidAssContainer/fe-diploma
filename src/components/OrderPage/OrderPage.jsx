import './style.sass';

import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { Header } from 'widgets/header';
import { SearchTicketsForm } from '../SearchTicketsForm';
import { TicketDetailsFilter, TicketDetailsInfo } from './TicketDetails';
import { Heading } from 'shared/ui/components/Heading';
import { CheckStep, PaymentStep, SearchTickets } from './OrderStep';
import { ChoosePlaces } from './OrderStep/ChoosePlacesStep';
import { Button } from 'components/Button';
import { TicketFeatures } from 'components/Ticket/Ticket';
import { PassengersStep } from './OrderStep/PassengersStep';

import { getLastDirectionsAsync } from 'reducers/search';
import { formatNumber } from 'shared/lib/helpers';
import { Stepper } from 'entities/steps';

export const OrderPage = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoading, loadingFromSearchForm } = useSelector(
    (state) => state.search,
  );
  const { step } = useSelector((state) => state.steps);

  const stepperRef = useRef(null);

  useEffect(() => {
    dispatch(getLastDirectionsAsync());
  }, []);

  // useEffect(() => {
  //   const { pathname } = location;
  //   stepperRef.current?.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //   });
  // }, [step]);

  return (
    <>
      <section className="order-page__hero">
        <Header />
        <SearchTicketsForm />
        {!loadingFromSearchForm && <Stepper innerRef={stepperRef} />}
      </section>
      {isLoading && loadingFromSearchForm ? (
        <SearchLoader />
      ) : (
        <section className="order-page__content_wrapper">
          <div className="order-page__content">
            <aside className="order-page__aside">
              {step === 1 ? (
                <>
                  <TicketDetailsFilter />
                  <LastTickets />
                </>
              ) : (
                <TicketDetailsInfo />
              )}
            </aside>
            <main className="order-page__main">{children}</main>
          </div>
        </section>
      )}
    </>
  );
};

const LastTickets = () => {
  const { lastDirections } = useSelector((state) => state.search);

  return (
    <div className="last-tickets">
      <Heading size="s" className="last-tickets__header">
        Последние билеты
      </Heading>
      <ul className="last-tickets__list">
        {lastDirections.map(
          ({ departure }, i) =>
            i < 3 && <LastTicketItem key={departure._id} {...departure} />,
        )}
      </ul>
    </div>
  );
};

const LastTicketItem = ({ min_price, from, to, ...props }) => {
  return (
    <div className="last-tickets__item">
      <div className="last-ticket__stations">
        <LastTicketDirection {...from} direction="from" />
        <LastTicketDirection {...to} direction="to" />
      </div>
      <div className="last-ticket__info">
        <TicketFeatures {...props} />
        <div className="last-ticket__price">
          <span className="last-ticket__price_from">от</span>
          <span className="last-ticket__price_amount">
            {formatNumber(min_price)}
          </span>
          <span className="last-ticket__price_currency">₽</span>
        </div>
      </div>
    </div>
  );
};

const LastTicketDirection = ({
  direction,
  railway_station_name,
  city: { name },
}) => {
  return (
    <div
      className={cn(
        'last-ticket__station',
        `last-ticket__station_${direction}`,
      )}
    >
      <div className="last-ticket__station_city">{name}</div>
      <div className="last-ticket__station_name">
        {railway_station_name} вокзал
      </div>
    </div>
  );
};

const SearchLoader = () => (
  <div className="search-loader__container">
    <div className="search-loader__text">Идёт поиск</div>
  </div>
);
