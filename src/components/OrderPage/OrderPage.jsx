import './style.sass';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { PageHeader } from '../PageHeader';
import { SearchTicketsForm } from '../SearchTicketsForm';
import { TicketDetailsFilter, TicketDetailsInfo } from './TicketDetails';
import { TicketList } from './TicketList';
import { Pagination } from 'components/Pagination';
import { Header } from 'components/Header';
// import { PaymentStep, TicketsStep } from './OrderStep/TicketsStep';
import { PassengersStep, PaymentStep, TicketsStep } from './OrderStep';
import { ChoosePlaces, ChoosePlacesStep } from './OrderStep/ChoosePlacesStep';
import { SearchTickets } from './OrderStep/TicketsStep';

export const OrderPage = ({
  match: {
    params: { step, stepStage },
  },
}) => {
  // const { step, match } = props;
  // console.log(match.url);
  // console.log(match.path);
  console.log(step);

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
                // case 'check':
                //   return <CheckStep />;
              }
            })()}
          </main>
        </div>
      </section>
    </>
  );
};

const LastTickets = () => {
  // const tickets = [

  // ]

  return (
    <div className="last-tickets">
      <Header size="s" className="last-tickets__header">
        Последние билеты
      </Header>
      <ul className="last-tickets__list">
        <LastTicketItem />
        <LastTicketItem />
        <LastTicketItem />
      </ul>
    </div>
  );
};

const LastTicketItem = () => {
  return (
    <div className="last-tickets__item">
      <div className="last-ticket__stations">
        <div className="last-ticket__stations_from">
          <div className="last-ticket__city">Москва</div>
          <div className="last-ticket__station">Курский вокзал</div>
        </div>
        <div className="last-ticket__stations_to">
          <div className="last-ticket__city">Казань</div>
          <div className="last-ticket__station">Московский вокзал</div>
        </div>
      </div>
      <div className="last-ticket__info">
        <div className="last-ticket__icons"></div>
        <div className="last-ticket__price">
          <span className="last-ticket__price_from">от</span>
          <span className="last-ticket__price_amount">3800</span>
          <span className="last-ticket__price_currency">₽</span>
        </div>
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
