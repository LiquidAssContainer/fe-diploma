import './style.sass';

import cn from 'classnames';

import { Header } from 'components/Header';

import { ReactComponent as ArrowInRectangleIcon } from 'assets/icons/arrow_in_rectangle.svg';
import { ReactComponent as PersonIcon } from 'assets/icons/person.svg';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';

import {
  TicketDetails,
  TicketDetailsHeader,
  TicketDetailsSection,
  Icon,
  TicketDetailsSectionContent,
} from './TicketDetails';

export const TicketDetailsInfo = () => {
  return (
    <TicketDetails>
      <TicketDetailsSection>
        <Header className="ticket-details__info_header" size="s">
          Детали поездки
        </Header>
      </TicketDetailsSection>

      <TicketDetailsSection
        isExpandable
        headerSlot={
          <TicketDetailsHeader
            title="Туда"
            iconSlot={
              <Icon
                wrapperClassName="ticket-details__icon"
                icon={ArrowInRectangleIcon}
              />
            }
            asideSlot={<TicketDetailsDate date="31.08.2018" />}
          />
        }
      >
        <TicketDetailsSectionContent>
          <TicketDetailsTripInfo />
        </TicketDetailsSectionContent>
      </TicketDetailsSection>

      <TicketDetailsSection
        isExpandable
        headerSlot={
          <TicketDetailsHeader
            title="Обратно"
            iconSlot={
              <Icon
                wrapperClassName="ticket-details__icon"
                iconClassName="arrow_left"
                icon={ArrowInRectangleIcon}
              />
            }
            asideSlot={<TicketDetailsDate date="31.08.2018" />}
          />
        }
      >
        <TicketDetailsSectionContent>
          <TicketDetailsTripInfo isReturn />
        </TicketDetailsSectionContent>
      </TicketDetailsSection>

      <TicketDetailsSection
        isExpandable
        headerSlot={
          <TicketDetailsHeader
            title="Пассажиры"
            iconSlot={
              <Icon wrapperClassName="ticket-details__icon" icon={PersonIcon} />
            }
          />
        }
      >
        <TicketDetailsSectionContent>
          <TicketDetailsTicketSum />
          <TicketDetailsTicketSum />
        </TicketDetailsSectionContent>
      </TicketDetailsSection>

      <TicketDetailsSection>
        <TicketDetailsRow>
          <div className="ticket-details__info_total">Итог</div>
          <div className="ticket-details__info_price">
            <span>7 700 </span>
            <span className="ticket-details__info_currency">₽</span>
          </div>
        </TicketDetailsRow>
      </TicketDetailsSection>
    </TicketDetails>
  );
};

const TicketDetailsTripInfo = ({ isReturn }) => {
  return (
    <>
      <TicketDetailsRow>
        <TicketDetailsRowLabel value="№ Поезда" />
        <TicketDetailsRowValue value="116C" />
      </TicketDetailsRow>

      <TicketDetailsRow>
        <TicketDetailsRowLabel value="Название" />
        <TicketDetailsFromTo from="Адлер" to="Санкт-Петербург" />
      </TicketDetailsRow>

      <div className="ticket-details__arrival-dates">
        <TicketDetailsRow className="ticket-details__arrival-time">
          <TicketDetailsRowValue value="00:10" />
          <div>
            <TicketDetailsTripDuration value="9 : 42" />
            <Icon
              wrapperClassName={cn('ticket-details__icon_arrow', {
                arrow_left: isReturn,
              })}
              // iconClassName={isReturn && 'arrow_left'}
              icon={ArrowIcon}
            />
          </div>
          <TicketDetailsRowValue value="10:10" />
        </TicketDetailsRow>

        <TicketDetailsRow>
          <TicketDetailsDate
            className="ticket-details__date_grey"
            date="22.08.2022"
          />
          <TicketDetailsDate
            className="ticket-details__date_grey"
            date="23.08.2022"
          />
        </TicketDetailsRow>
      </div>

      <TicketDetailsRow>
        <TicketDetailsStation city="Москва" station="Ладожский вокзал" />
        <TicketDetailsStation city="Москва" station="Ладожский вокзал" />
      </TicketDetailsRow>
    </>
  );
};

const TicketDetailsRow = ({ className, children }) => {
  return <div className={cn('ticket-details__row', className)}>{children}</div>;
};

const TicketDetailsRowLabel = ({ value }) => {
  return <div className="ticket-details__row_label">{value}</div>;
};

const TicketDetailsRowValue = ({ value, children }) => {
  return <div className="ticket-details__row_value">{value || children}</div>;
};

const TicketDetailsDate = ({ date, className }) => {
  return <span className={cn('ticket-details__date', className)}>{date}</span>;
};

const TicketDetailsFromTo = ({ from, to }) => {
  return (
    <div className="ticket-details__from-to">
      <div className="ticket-details__from-to_city">{from}</div>
      <div className="ticket-details__from-to_city">{to}</div>
    </div>
  );
};

const TicketDetailsTripDuration = ({ value }) => {
  return <div className="ticket-details__trip-duration">{value}</div>;
};

const TicketDetailsStation = ({ city, station }) => {
  return (
    <div className="ticket-details__station">
      <div className="ticket-details__station_city">{city}</div>
      <div className="ticket-details__station_name">{station}</div>
    </div>
  );
};

const TicketDetailsTicketSum = ({ count, type, sum }) => {
  return (
    <TicketDetailsRow>
      <TicketDetailsRowLabel value="2 Взрослых" />
      <TicketDetailsRowValue>
        <span>5 560</span>
        <span className="ticket-details__tickets-summary_currency">₽</span>
      </TicketDetailsRowValue>
    </TicketDetailsRow>
  );
};
