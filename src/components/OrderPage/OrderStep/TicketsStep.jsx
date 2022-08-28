import './style.sass';

import { Pagination } from 'components/Pagination';
import { Ticket } from 'components/Ticket/Ticket';

// export const TicketsStep = ({ stage }) => {
//   return stage === 'tickets' ? <SearchTickets /> : <SearchTickets />;
// };

export const SearchTickets = () => {
  return (
    <>
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
      <ul className="tickets__list">
        <Ticket />
        <Ticket />
        <Ticket />
      </ul>
      <Pagination />
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
