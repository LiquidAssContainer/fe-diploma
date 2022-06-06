import './style.sass';

import { Header } from '../Header';
import { SearchTicketsForm } from '../SearchTicketsForm';
import { TicketFilter } from './TicketFilter';

export const OrderPage = () => {
  return (
    <>
      <section className="order-page__hero">
        <Header />
        <SearchTicketsForm />
        <Stepper />
      </section>
      <section className="order-page__content">
        <aside className="order-page__aside">
          <TicketFilter />
        </aside>
        <main>
          <h3 className="header">Выбор мест</h3>
        </main>
      </section>
    </>
  );
};

const Stepper = ({ activeStep = 0 }) => {
  const steps = [
    { name: 'tickets', label: 'Билеты' },
    { name: 'passengers', label: 'Пассажиры' },
    { name: 'payment', label: 'Оплата' },
    { name: 'check', label: 'Проверка' },
  ];

  return (
    <ul className="steps__list">
      {steps.map((step, i) => {
        return <Step {...step} i={i} isColored={i <= activeStep} />;
      })}
    </ul>
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
