import './style.sass';

import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFormContext } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { ReactComponent as InverseBtnIcon } from 'assets/icons/inverse_button.svg';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import {
  clearCitiesList,
  getCitiesAsync,
  getDirectionsAsync,
  updateQueryParams,
} from 'reducers/search';
import { DateInput, LocationInput } from '../Input';
import { Header } from 'components/Header';
import { Form } from 'lib/Form';
import { useSetValuesByQuery } from 'hooks/useSetValuesByQuery';
import { useWatchQueryParams } from 'hooks/useWatchQueryParams';

export const SearchTicketsForm = ({ isSquare }) => {
  const form = useForm({
    defaultValues: {
      from_city: '',
      to_city: '',
      date_start: '',
      date_end: '',
    },
  });

  const { queryString, citiesList } = useSelector((state) => state.search);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { setValue, getValues } = form;

  const [dates, setDates] = useState({ start: null, end: null });

  const onSelectStartDate = (date) => {
    setDates((prev) => ({ ...prev, start: date }));
  };

  const onSelectEndDate = (date) => {
    setDates((prev) => ({ ...prev, end: date }));
  };

  const onSubmit = (data) => {
    const findCityId = (name, list) => {
      if (!name || !list) return;
      const city = list.find((city) => city.name === name);
      return city?._id || name;
    };

    const { from_city, to_city } = getValues();
    const from_city_id = findCityId(from_city, citiesList.from_city);
    const to_city_id = findCityId(to_city, citiesList.to_city);

    dispatch(updateQueryParams({ ...data, from_city_id, to_city_id }));

    if (location.pathname !== '/order/tickets/tickets') {
      history.push('/order/tickets/tickets');
    }
  };

  const onChangeSearch = (fieldName, searchString) => {
    if (searchString) {
      dispatch(getCitiesAsync({ searchString, fieldName }));
    } else {
      dispatch(clearCitiesList(fieldName));
    }
  };

  useSetValuesByQuery(form.getValues(), setValue);
  useWatchQueryParams(queryString, () => dispatch(getDirectionsAsync()));

  return (
    <Form
      form={form}
      className={cn('tickets__form', isSquare ? 'form__square' : 'form__flex')}
      onSubmit={onSubmit}
    >
      <div className="tickets__form_inputs_container">
        <div className="tickets__form_block">
          <Header className="tickets__form_header" size="s">
            Направление
          </Header>
          <div className="tickets__form_inputs_group without-gap">
            <CitySelectInput
              name="from_city"
              placeholder="Откуда"
              onChange={onChangeSearch}
            />
            <button className="form__button_inverse" type="button">
              <InverseBtnIcon />
            </button>
            <CitySelectInput
              name="to_city"
              placeholder="Куда"
              setValue={setValue}
              onChange={onChangeSearch}
            />
          </div>
        </div>
        <div className="tickets__form_block">
          <Header className="tickets__form_header" size="s">
            Дата
          </Header>
          <div className="tickets__form_inputs_group">
            <DateInput
              name="date_start"
              onSelectDate={onSelectStartDate}
              selected={dates.start}
              endDate={dates.end}
              size="l"
            />
            <DateInput
              name="date_end"
              onSelectDate={onSelectEndDate}
              selected={dates.end}
              startDate={dates.start}
              size="l"
            />
          </div>
        </div>
      </div>
      <button className="tickets__form_button_submit" type="submit">
        Найти билеты
      </button>
    </Form>
  );
};

const CitySelectInput = ({ name, placeholder, onChange }) => {
  const ref = useRef();
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);

  const { citiesList } = useSelector((state) => state.search);

  const { setValue } = useFormContext();

  const onClickCity = (cityName) => {
    setValue(name, cityName);
    setIsCitySelectOpen(false);
  };

  useOnClickOutside(ref, () => {
    if (isCitySelectOpen) {
      setIsCitySelectOpen(false);
    }
  });

  return (
    <div ref={ref} className="city-select__container">
      <LocationInput
        name={name}
        size="l"
        placeholder={placeholder}
        required
        onChange={(e) => {
          onChange(name, e.target.value);
        }}
        onFocus={() => setIsCitySelectOpen(true)}
      />
      <CitySelect
        citiesList={citiesList[name]}
        onClick={onClickCity}
        isOpen={isCitySelectOpen}
      />
    </div>
  );
};

const CitySelect = ({ citiesList, onClick, isOpen }) => {
  return isOpen ? (
    <ul className="city-select__list">
      {citiesList.map(({ name: city }) => (
        <CitySelectItem key={city} city={city} onClick={() => onClick(city)} />
      ))}
    </ul>
  ) : null;
};

const CitySelectItem = ({ city, onClick }) => {
  return (
    <li className="city-select__item">
      <button
        className="city-select__item_button"
        onClick={onClick}
        type="button"
      >
        {city}
      </button>
    </li>
  );
};
