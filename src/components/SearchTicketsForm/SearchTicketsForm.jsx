import cn from 'classnames';

import './style.sass';

import { DateInput, LocationInput } from '../Input';
import { ReactComponent as InverseBtnIcon } from 'assets/icons/inverse_button.svg';
import { useState } from 'react';

export const SearchTicketsForm = ({ direction, isSquare }) => {
  const [dates, setDates] = useState({ start: null, end: null });

  const onSelectStartDate = (date) => {
    setDates((prev) => ({ ...prev, start: date }));
  };

  const onSelectEndDate = (date) => {
    setDates((prev) => ({ ...prev, end: date }));
  };

  return (
    <form
      className={cn('tickets__form', isSquare ? 'form__square' : 'form__flex')}
    >
      <div className="tickets__form_inputs_container">
        <div className="tickets__form_block">
          <h4 className="header__size_s">Направление</h4>
          <div className="tickets__form_inputs_group without-gap">
            <LocationInput size="l" placeholder="Откуда" />
            <button className="form__button_inverse" type="button">
              <InverseBtnIcon />
            </button>
            <LocationInput size="l" placeholder="Куда" />
          </div>
        </div>
        <div className="tickets__form_block">
          <h4 className="header__size_s">Дата</h4>
          <div className="tickets__form_inputs_group">
            <DateInput
              onSelectDate={onSelectStartDate}
              selected={dates.start}
              endDate={dates.end}
              size="l"
            />
            <DateInput
              onSelectDate={onSelectEndDate}
              selected={dates.end}
              startDate={dates.start}
              size="l"
            />
          </div>
        </div>
      </div>
      <button className="tickets__form_button_submit" type="button">
        Найти билеты
      </button>
    </form>
  );
};
