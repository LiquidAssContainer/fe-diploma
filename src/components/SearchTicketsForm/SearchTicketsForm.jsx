import cn from 'classnames';

import { DateInput, LocationInput } from '../Input';
import { ReactComponent as InverseBtnIcon } from 'assets/icons/inverse_button.svg';

export const SearchTicketsForm = ({ direction, dates, isSquare }) => {
  return (
    <form
      className={cn(
        'search-tickets__form',
        isSquare ? 'form__square' : 'form__flex',
      )}
    >
      <div className="search-tickets__block">
        <h4 className="header__size_s">Направление</h4>
        <div className="search-tickets__inputs-container without-gap">
          <LocationInput className="form__input" placeholder="Откуда" />
          <button className="form__button_inverse">
            <InverseBtnIcon />
          </button>
          <LocationInput className="form__input" placeholder="Куда" />
        </div>
      </div>
      <div className="search-tickets__block">
        <h4 className="header__size_s">Дата</h4>
        <div className="search-tickets__inputs-container">
          <DateInput className="form__input" />
          <DateInput className="form__input" />
        </div>
      </div>
      <button className="tickets__form_btn_submit">Найти билеты</button>
    </form>
  );
};
