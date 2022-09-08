import './style.sass';

import cn from 'classnames';
import { getHours, getMinutes } from 'date-fns';

import { Header } from 'components/Header';
import { Button } from 'components/Button';
import { Icon } from 'components/OrderPage/TicketDetails/TicketDetails';

import { ReactComponent as TrainIcon } from 'assets/icons/train.svg';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { ReactComponent as WiFiIcon } from 'assets/icons/wifi.svg';
import { ReactComponent as ExpressIcon } from 'assets/icons/express.svg';
import { formatDateToHM, formatNumber } from 'lib/helpers';

const features = [WiFiIcon, ExpressIcon, ExpressIcon];

const classTitles = {
  fourth: 'Сидячий',
  third: 'Плацкарт',
  second: 'Купе',
  first: 'Люкс',
};

const classOrder = Object.keys(classTitles);

export const Ticket = ({
  isChecking,
  from,
  to,
  train,
  price_info,
  available_seats_info,
  duration,
}) => {
  const availableSeats = classOrder.reduce((acc, classType) => {
    const seatsCount = available_seats_info[classType];
    if (seatsCount) {
      acc.push({
        seatsCount,
        minPrice: price_info[classType].top_price,
        classTitle: classTitles[classType],
      });
    }
    return acc;
  }, []);

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
            {train.name}
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
      <TicketDirections duration={duration} from={from} to={to} />
      <div className="ticket__places">
        <ul className="ticket__places_list">
          {availableSeats.map((seats) => (
            <TicketPlacesItem {...seats} />
          ))}
          {/* <TicketPlacesItem />
          <TicketPlacesItem />
          <TicketPlacesItem /> */}
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

const TicketDirections = ({ ...props }) => {
  return (
    <div className="ticket__directions">
      <TicketDirection direction="forward" {...props} />
      <TicketDirection direction="backward" {...props} />
    </div>
  );
};

const TicketDirection = ({ duration, direction, from, to }) => {
  return (
    <div
      className={cn('direction', {
        direction_reversed: direction === 'backward',
      })}
    >
      <TripPoint {...from} />
      <div className="trip__duration_container">
        <div className="trip__duration">
          {getHours(duration)} : {getMinutes(duration)}
        </div>
        <div className="trip__direction trip__direction_right">
          {direction === 'forward' ? (
            <ArrowIcon className="trip__direction_icon" />
          ) : (
            <ArrowIcon className="trip__direction_icon arrow_left" />
          )}
        </div>
      </div>
      <TripPoint {...to} />
    </div>
  );
};

export const TripPoint = ({ datetime, city, railway_station_name }) => {
  return (
    <div className="trip__point">
      <div className="trip__point_time">{formatDateToHM(datetime)}</div>
      <div className="trip__point_city">{city.name}</div>
      <div className="trip__point_station">{railway_station_name} вокзал</div>
    </div>
  );
};

const TicketPlacesItem = ({ classTitle, seatsCount, minPrice }) => {
  return (
    <div className="trip__places_item">
      <div className="place__type">{classTitle}</div>
      <div className="place__quantity">{seatsCount}</div>
      <div className="place__price">
        <span className="place__price_from">от</span>
        <span className="place__price_amount">{formatNumber(minPrice)}</span>
        <span className="place__price_currency">₽</span>
      </div>
    </div>
  );
};
