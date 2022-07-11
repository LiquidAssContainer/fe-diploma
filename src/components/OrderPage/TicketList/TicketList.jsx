import './style.sass';

import { ReactComponent as TrainIcon } from 'assets/icons/train.svg';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { Header } from 'components/Header';

export const TicketList = () => {
  return (
    <ul className="tickets__list">
      <Ticket />
      <Ticket />
      <Ticket />
    </ul>
  );
};

const Ticket = () => {
  return (
    <div className="tickets__item">
      <div className="ticket__main-info">
        <div className="ticket__main-info_header">
          <div className="ticket__train-icon_wrapper">
            <TrainIcon className="ticket__train-icon" />
          </div>
          <Header size="xs">116C</Header>
        </div>
        <div className="ticket__trip-points">
          Адлер → Москва → Санкт-Петербург
        </div>
      </div>
      <TicketDirections />
      <div className="ticket__places">
        <ul className="ticket__places_list">
          <TicketPlacesItem />
          <TicketPlacesItem />
          <TicketPlacesItem />
        </ul>
        <button className="ticket__places_button">Выбрать места</button>
      </div>
    </div>
  );
};

const TicketDirections = ({ duration, directions }) => {
  return (
    <div className="ticket__directions">
      <TicketDirection />
      <TicketDirection />
    </div>
  );
};

const TicketDirection = ({ time, city, station, direction }) => {
  return (
    <div className="direction">
      <TripPoint />
      <div className="trip__duration_container">
        <div className="trip__duration">9 : 42</div>
        <div className="trip__direction trip__direction_right">
          {direction === 'left' ? (
            <ArrowIcon className="trip__direction_icon" />
          ) : (
            <ArrowIcon className="trip__direction_icon arrow_left" />
          )}
        </div>
      </div>
      <TripPoint />
    </div>
  );
};

const TripPoint = ({ time, city, station }) => {
  return (
    <div className="trip__point">
      {/* <div className="trip__point_time">{time}</div>
      <div className="trip__point_city">{city}</div>
      <div className="trip__point_station">{station}</div> */}
      <div className="trip__point_time">18:88</div>
      <div className="trip__point_city">Екатеринбург</div>
      <div className="trip__point_station">Курский вокзал</div>
    </div>
  );
};

const TicketPlacesItem = () => {
  return (
    <div className="trip__places_item">
      <div className="place__type">Плацкарт</div>
      <div className="place__quantity">52</div>
      <div className="place__price">
        <span className="place__price_from">от</span>
        <span className="place__price_amount">3800</span>
        <span className="place__price_currency">₽</span>
      </div>
    </div>
  );
};
