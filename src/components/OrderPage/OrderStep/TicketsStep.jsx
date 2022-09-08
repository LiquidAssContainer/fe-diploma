import './style.sass';

import { Pagination } from 'components/Pagination';
import { Ticket } from 'components/Ticket/Ticket';
import { Select } from 'components/Select';
import { useSelector } from 'react-redux';
import { changeSearchParameter } from 'reducers/search';
import { useDispatch } from 'react-redux';

// export const TicketsStep = ({ stage }) => {
//   return stage === 'tickets' ? <SearchTickets /> : <SearchTickets />;
// };
const pageLimits = [5, 10, 20];

export const SearchTickets = () => {
  const { resultItems, resultsCount, limit } = useSelector(
    (state) => state.search,
  );

  return (
    <>
      <div className="results__info">
        <div className="results__amount">найдено {resultsCount}</div>
        <SortBySelect
          className="results__sort-by_select"
          label="сортировать по:"
        />
        <div className="results__amount-per-page">
          показывать по:
          <AmountRadioGroup activeLimit={limit} />
        </div>
      </div>
      <ul className="tickets__list">
        {resultItems.map(({ departure }) => (
          // НО МБ ЭТО КАК KEY НЕ ПОДХОДИТ???? // TODO
          <Ticket key={departure._id} {...departure} />
        ))}
      </ul>
      <Pagination />
    </>
  );
};

const AmountRadioGroup = ({ activeLimit }) => {
  return (
    <div className="results__amount-per-page_inputs">
      {pageLimits.map((limit) => (
        <AmountRadioInput
          key={limit}
          limit={limit}
          isChecked={activeLimit === limit}
          name="amount-per-page"
        />
      ))}
    </div>
  );
};

const AmountRadioInput = ({ limit, name, isChecked }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(changeSearchParameter({ name: 'limit', value: limit }));
  };

  return (
    <label className="amount-per-page__input_label">
      <input
        className="amount-per-page__input"
        type="radio"
        name={name}
        checked={isChecked}
        onClick={onClick}
      />
      <span className="amount-per-page__input_span">{limit}</span>
    </label>
  );
};

const SortBySelect = ({ options1, label, name }) => {
  const options = [
    { label: 'времени', value: 'date' },
    { label: 'стоимости', value: 'price' },
    { label: 'длительности', value: 'duration' },
  ];
  return (
    <div className="results__sort-by">
      {label && <label className="results__sort-by_label">{label}</label>}
      <Select className="results__sort-by_select" optionsList={options} />
    </div>
  );
};
