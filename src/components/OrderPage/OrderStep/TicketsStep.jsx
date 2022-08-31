import './style.sass';

import { Pagination } from 'components/Pagination';
import { Ticket } from 'components/Ticket/Ticket';
import { Select } from 'components/Select';

// export const TicketsStep = ({ stage }) => {
//   return stage === 'tickets' ? <SearchTickets /> : <SearchTickets />;
// };

export const SearchTickets = () => {
  return (
    <>
      <div className="results__info">
        <div className="results__amount">найдено 20</div>
        <SortBySelect
          className="results__sort-by_select"
          label="сортировать по:"
        />
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

const SortBySelect = ({ options1, label, name }) => {
  const options = [
    { label: 'времени', value: 'adult' },
    { label: 'стоимости', value: 'child' },
    { label: 'длительности', value: 'child2' },
  ];
  return (
    <div className="results__sort-by">
      {label && <label className="results__sort-by_label">{label}</label>}
      <Select className="results__sort-by_select" optionsList={options} />
    </div>
  );
};
