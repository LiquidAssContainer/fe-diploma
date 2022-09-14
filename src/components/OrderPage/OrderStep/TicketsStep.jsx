import './style.sass';

import { Pagination } from 'components/Pagination';
import { Ticket } from 'components/Ticket/Ticket';
import { Select } from 'components/Select';
import { useSelector } from 'react-redux';
import { updateQueryParams } from 'reducers/search';
import { useDispatch } from 'react-redux';
import { Form } from 'lib/Form';
import { Input } from 'components/Input';
import { useForm, useFormContext } from 'react-hook-form';
import { useSetValuesByQuery } from 'hooks/useSetValuesByQuery';

// export const TicketsStep = ({ stage }) => {
//   return stage === 'tickets' ? <SearchTickets /> : <SearchTickets />;
// };

const pageLimits = [5, 10, 20];

const options = [
  { label: 'времени', value: 'date' },
  { label: 'стоимости', value: 'price' },
  { label: 'длительности', value: 'duration' },
];

export const SearchTickets = () => {
  const { resultItems, resultsCount } = useSelector((state) => state.search);

  const form = useForm({
    defaultValues: {
      limit: 5,
      sort: 'date',
    },
  });

  const { setValue } = form;

  const { limit, sort } = form.getValues();

  useSetValuesByQuery(form.getValues(), setValue);

  return (
    <>
      <Form form={form} onSubmit={() => console.log('submit')}>
        <div className="results__info">
          <div className="results__amount">найдено {resultsCount}</div>
          <SortBySelect
            className="results__sort-by_select"
            name="sort"
            options={options}
            label="сортировать по:"
            selected={sort}
          />
          <div className="results__amount-per-page">
            показывать по:
            <AmountRadioGroup checked={limit} name="limit" />
          </div>
        </div>
      </Form>
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

const AmountRadioGroup = ({ checked, name }) => {
  return (
    <div className="results__amount-per-page_inputs">
      {pageLimits.map((value) => (
        <AmountRadioInput
          key={value}
          value={value}
          isChecked={checked == value}
          name={name}
        />
      ))}
    </div>
  );
};

const AmountRadioInput = ({ value, name, isChecked }) => {
  const dispatch = useDispatch();
  const { setValue } = useFormContext();

  const onChange = () => {
    setValue(name, value);
    dispatch(updateQueryParams({ limit: value }));
  };

  return (
    <label className="amount-per-page__input_label">
      <Input
        className="amount-per-page__input"
        type="radio"
        name={name}
        value={value}
        isChecked={isChecked}
        onChange={onChange}
      />
      <span className="amount-per-page__input_span">{value}</span>
    </label>
  );
};

const SortBySelect = ({ options, label, name, selected }) => {
  const dispatch = useDispatch();
  const { setValue } = useFormContext();

  const onSelect = (value) => {
    setValue(name, value);
    dispatch(updateQueryParams({ [name]: value }));
  };

  return (
    <div className="results__sort-by">
      {label && <label className="results__sort-by_label">{label}</label>}
      <Select
        className="results__sort-by_select"
        name={name}
        optionsList={options}
        selected={selected}
        onSelect={onSelect}
      />
    </div>
  );
};
