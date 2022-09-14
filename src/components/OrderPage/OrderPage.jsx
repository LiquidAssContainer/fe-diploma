import './style.sass';

import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';

import { PageHeader } from '../PageHeader';
import { SearchTicketsForm } from '../SearchTicketsForm';
import { TicketDetailsFilter, TicketDetailsInfo } from './TicketDetails';
import { Pagination } from 'components/Pagination';
import { Header } from 'components/Header';
// import { PaymentStep, TicketsStep } from './OrderStep/TicketsStep';
import {
  CheckStep,
  PassengersStep,
  PaymentStep,
  TicketsStep,
} from './OrderStep';
import { ChoosePlaces, ChoosePlacesStep } from './OrderStep/ChoosePlacesStep';
import { SearchTickets } from './OrderStep/TicketsStep';
import cn from 'classnames';
import { Button } from 'components/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  getDirectionsAsync,
  getLastDirectionsAsync,
  updateQueryParams,
} from 'reducers/search';
import { formatNumber } from 'lib/helpers';
import { useEffect } from 'react';
import qs from 'qs';

export const OrderPage = ({
  match: {
    params: { step, stepStage },
  },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLastDirectionsAsync());
  }, []);

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
            {step === 'tickets' ? (
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
                case 'tickets':
                  return stepStage === 'tickets' ? (
                    <SearchTickets />
                  ) : (
                    <ChoosePlaces />
                  );
                case 'passengers':
                  return <PassengersStep />;
                case 'payment':
                  return <PaymentStep />;
                // case 'choose-place':
                //   return <ChoosePlacesStep />;
                case 'check':
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
          <LastTicketItem {...departure} />
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
    { name: 'tickets', label: 'Билеты' },
    { name: 'passengers', label: 'Пассажиры' },
    { name: 'payment', label: 'Оплата' },
    { name: 'check', label: 'Проверка' },
  ];

  const activeStepIndex = steps.findIndex((step) => step.name === activeStep);

  return (
    <div className="steps__list_wrapper">
      <ul className="steps__list">
        {steps.map((step, i) => {
          return <Step {...step} i={i} isColored={i <= activeStepIndex} />;
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
  <Button classname="button__next-step" size="l" style="colored">
    {children}
  </Button>
);
