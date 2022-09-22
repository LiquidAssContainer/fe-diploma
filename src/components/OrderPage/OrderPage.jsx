import './style.sass';

import cn from 'classnames';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { PageHeader } from '../PageHeader';
import { SearchTicketsForm } from '../SearchTicketsForm';
import { TicketDetailsFilter, TicketDetailsInfo } from './TicketDetails';
import { Header } from 'components/Header';
import {
  CheckStep,
  PassengersStep,
  PaymentStep,
  SearchTickets,
} from './OrderStep';
import { ChoosePlaces } from './OrderStep/ChoosePlacesStep';
import { Button } from 'components/Button';
import { getLastDirectionsAsync } from 'reducers/search';
import { formatNumber } from 'lib/helpers';

export const OrderPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLastDirectionsAsync());
  }, []);
  const { step } = useSelector((state) => state.stepper);

  return (
    <>
      <section className="order-page__hero">
        <PageHeader />
        <SearchTicketsForm />
        <Stepper activeStep={step} />
      </section>
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
          <main className="order-page__main">
            {(() => {
              switch (step) {
                case 1:
                  return (
                    <Router>
                      <Switch>
                        <Route path="/search" component={SearchTickets} />
                        <Route path="/seats/:id" component={ChoosePlaces} />
                      </Switch>
                    </Router>
                  );
                case 2:
                  return <PassengersStep />;
                case 3:
                  return <PaymentStep />;
                case 4:
                  return <CheckStep />;
              }
            })()}
          </main>
        </div>
      </section>
    </>
  );
};

const LastTickets = () => {
  const { lastDirections } = useSelector((state) => state.search);

  return (
    <div className="last-tickets">
      <Header size="s" className="last-tickets__header">
        Последние билеты
      </Header>
      <ul className="last-tickets__list">
        {lastDirections.map(({ departure }) => (
          <LastTicketItem key={departure._id} {...departure} />
        ))}
      </ul>
    </div>
  );
};

const LastTicketItem = ({
  min_price,
  from,
  to,
  is_express,
  have_air_conditioning,
  have_wifi,
}) => {
  return (
    <div className="last-tickets__item">
      <div className="last-ticket__stations">
        <LastTicketDirection {...from} direction="from" />
        <LastTicketDirection {...to} direction="to" />
      </div>
      <div className="last-ticket__info">
        {/* TODO */}
        <div className="last-ticket__icons"></div>
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

const Stepper = ({ activeStep }) => {
  const steps = [
    { number: 1, name: 'tickets', label: 'Билеты' },
    { number: 2, name: 'passengers', label: 'Пассажиры' },
    { number: 3, name: 'payment', label: 'Оплата' },
    { number: 4, name: 'check', label: 'Проверка' },
  ];

  const activeStepIndex = steps.findIndex((step) => step.number === activeStep);

  return (
    <div className="steps__list_wrapper">
      <ul className="steps__list">
        {steps.map((step, i) => {
          return (
            <Step key={i} {...step} i={i} isColored={i <= activeStepIndex} />
          );
        })}
      </ul>
    </div>
  );
};

const Step = ({ label, isColored, i }) => {
  return (
    <li className={`step__item${isColored ? ' step__item_colored' : ''}`}>
      <div className="steps__item_number">{i + 1}</div>
      <div className="steps__item_label">{label}</div>
    </li>
  );
};

export const NextStepButton = ({ children, onClick }) => (
  <Button
    classname="button__next-step"
    onClick={onClick}
    size="l"
    style="colored"
  >
    {children}
  </Button>
);
