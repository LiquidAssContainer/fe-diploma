import cn from 'classnames';

import './style.sass';

import { DateInput, LocationInput } from '../Input';
import { ReactComponent as InverseBtnIcon } from 'assets/icons/inverse_button.svg';

export const SearchTicketsForm = ({ direction, dates, isSquare }) => {
  return (
    <form
      className={cn('tickets__form', isSquare ? 'form__square' : 'form__flex')}
    >
      <div className="tickets__form_inputs_container">
        <div className="tickets__form_block">
          <h4 className="header__size_s">Направление</h4>
          <div className="tickets__form_inputs_group without-gap">
            <LocationInput size="l" placeholder="Откуда" />
            <button className="form__button_inverse">
              <InverseBtnIcon />
            </button>
            <LocationInput size="l" placeholder="Куда" />
          </div>
        </div>
        <div className="tickets__form_block">
          <h4 className="header__size_s">Дата</h4>
          <div className="tickets__form_inputs_group">
            <DateInput size="l" />
            <DateInput size="l" />
          </div>
        </div>
      </div>
      <button className="tickets__form_button_submit">Найти билеты</button>
    </form>
  );
};
