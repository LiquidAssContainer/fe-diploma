import './style.sass';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFormContext } from 'react-hook-form';

import { Pagination } from 'components/Pagination';
import { Ticket } from 'components/Ticket';
import { Select } from 'components/Select';
import { Input } from 'components/Input';
import { Form } from 'lib/Form';
import { setNoFetch, setPage, updateQueryParams } from 'reducers/search';

import { useSetValuesByQuery } from 'hooks/useSetValuesByQuery';

// export const TicketsStep = ({ stage }) => {
//   return stage === 'tickets' ? <SearchTickets /> : <SearchTickets />;
// };

const pageLimits = [5, 10, 20];

const [defaultLimit] = pageLimits;

const options = [
  { label: 'времени', value: 'date' },
  { label: 'стоимости', value: 'price' },
  { label: 'длительности', value: 'duration' },
];

export const SearchTickets = () => {
  const dispatch = useDispatch();
  const {
    resultsCount,
    currentPage,
    pages,
    queryParams: { limit, offset },
  } = useSelector((state) => state.search);

  const form = useForm({
    defaultValues: {
      limit: 5,
      sort: 'date',
    },
  });
  const { setValue } = form;
  const { sort } = form.getValues();

  const currentLimit = Number(limit || defaultLimit);
  const results = pages[currentPage] || [];

  const handlePaginate = (pageNumber) => {
    if (pages[pageNumber]) {
      dispatch(setNoFetch(true));
    }
    dispatch(
      updateQueryParams({
        offset: (pageNumber - 1) * currentLimit,
        resetPages: false,
      }),
    );
  };

  useSetValuesByQuery(form.getValues(), setValue);

  useEffect(() => {
    const page = Number(offset) / currentLimit + 1;
    dispatch(setPage(page));
  }, [offset]);

  return (
    <>
      <Form form={form}>
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
            <AmountRadioGroup checked={currentLimit} name="limit" />
          </div>
        </div>
      </Form>
      <ul className="tickets__list">
        {results.map(({ departure }) => (
          // НО МБ ЭТО КАК KEY НЕ ПОДХОДИТ???? // TODO
          <Ticket key={departure._id} {...departure} />
        ))}
      </ul>
      <Pagination
        perPage={currentLimit}
        total={resultsCount}
        currentPage={currentPage}
        onPageChange={handlePaginate}
      />
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
