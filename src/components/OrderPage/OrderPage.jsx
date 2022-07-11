import './style.sass';

import { PageHeader } from '../PageHeader';
import { SearchTicketsForm } from '../SearchTicketsForm';
import { TicketFilter } from './TicketFilter';
import { TicketList } from './TicketList';
import { Pagination } from 'components/Pagination';
import { Header } from 'components/Header';

export const OrderPage = () => {
  return (
    <>
      <section className="order-page__hero">
        <PageHeader />
        <SearchTicketsForm />
        <Stepper />
      </section>
      <section className="order-page__content">
        <aside className="order-page__aside">
          <TicketFilter />
          <LastTickets />
        </aside>
        <main className="order-page__main">
          <div className="results__info">
            <div className="results__amount">найдено 20</div>
            <div className="results__sort-by">
              сортировать по:
              <select className="results__sort-by_select">
                <option selected>времени</option>
                <option>стоимости</option>
                <option>длительности</option>
              </select>
            </div>
            <div className="results__amount-per-page">
              показывать по:
              <AmountRadioGroup />
            </div>
          </div>
          <TicketList />
          <Pagination />
        </main>
      </section>
    </>
  );
};

const AmountRadioGroup = () => {
  return (
    <div className="results__amount-per-page_inputs">
      <AmountRadioInput label="5" name="amount-per-page" />
      <AmountRadioInput label="10" name="amount-per-page" />
      <AmountRadioInput label="20" name="amount-per-page" />
    </div>
  );
};

const AmountRadioInput = ({ label, name }) => {
  return (
    <label className="amount-per-page__input_label">
      <input className="amount-per-page__input" type="radio" name={name} />
      <span className="amount-per-page__input_span">{label}</span>
    </label>
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
