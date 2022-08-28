import './style.sass';

import cn from 'classnames';

import { Header } from 'components/Header';
import { Button } from 'components/Button';
import { Icon } from 'components/OrderPage/TicketDetails/TicketDetails';

import { ReactComponent as TrainIcon } from 'assets/icons/train.svg';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { ReactComponent as WiFiIcon } from 'assets/icons/wifi.svg';
import { ReactComponent as ExpressIcon } from 'assets/icons/express.svg';

const features = [WiFiIcon, ExpressIcon, ExpressIcon];

export const Ticket = ({ isChecking }) => {
  return (
    <div
      className={cn('tickets__item', { tickets__item_checking: isChecking })}
    >
      <div className="ticket__main-info">
        <div className="ticket__main-info_header">
          <div className="ticket__train-icon_wrapper">
            <TrainIcon className="ticket__train-icon" />
          </div>
          <Header className="ticket__header" size="xs">
            116C
          </Header>
        </div>
        <div className="ticket__trip-points">
          <div className="ticket__trip-points_item ticket__trip-points_item_train-start">
            Адлер →
          </div>
          <div className="ticket__trip-points_item">Москва →</div>
          <div className="ticket__trip-points_item">Санкт-Петербург</div>
        </div>
      </div>
      <TicketDirections />
      <div className="ticket__places">
        <ul className="ticket__places_list">
          <TicketPlacesItem />
          <TicketPlacesItem />
          <TicketPlacesItem />
        </ul>
        <ul className="ticket__places_features">
          {features.map((icon) => (
            <TicketPlacesFeature icon={icon} />
          ))}
        </ul>
        {isChecking ? (
          <Button size="s" style="transparent-dark">
            Изменить
          </Button>
        ) : (
          <Button size="s" style="colored">
            Выбрать места
          </Button>
        )}
      </div>
    </div>
  );
};

const TicketPlacesFeature = ({ icon }) => {
  return (
    <div className="ticket__places_features_item">
      <Icon wrapperClassName="ticket__places_feature_icon" icon={icon} />
    </div>
  );
};

const TicketDirections = ({ duration, directions }) => {
  return (
    <div className="ticket__directions">
      <TicketDirection direction="forward" />
      <TicketDirection direction="backward" />
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
          {direction === 'forward' ? (
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

export const TripPoint = ({ time, city, station }) => {
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
        <span className="place__price_amount">3 800</span>
        <span className="place__price_currency">₽</span>
      </div>
    </div>
  );
};
