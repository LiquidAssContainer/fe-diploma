import './style.sass';

import cn from 'classnames';

import { Header } from 'components/Header';
import { Button } from 'components/Button';

import { ReactComponent as SecondClassIcon } from 'assets/icons/second_class.svg';
import { ReactComponent as ThirdClassIcon } from 'assets/icons/third_class.svg';
import { ReactComponent as FourthClassIcon } from 'assets/icons/fourth_class.svg';
import { ReactComponent as FirstClassIcon } from 'assets/icons/first_class.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { TripPoint } from '../../TicketList';

import { ReactComponent as TrainIcon } from 'assets/icons/train.svg';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { ReactComponent as ArrowInRectangleLarge } from 'assets/icons/arrow_in_rectangle_large.svg';
import { PlaceSelection } from './PlaceSelection';

const railcarTypes = [
  { label: 'Сидячий', Icon: FourthClassIcon },
  { label: 'Плацкарт', Icon: ThirdClassIcon },
  { label: 'Купе', Icon: SecondClassIcon },
  { label: 'Люкс', Icon: FirstClassIcon },
];

export const ChoosePlacesStep = () => {
  return (
    <>
      <Header size="s" className="uppercase">
        Выбор мест
      </Header>
      <div className="places__block_list">
        <ChoosePlacesBlock direction="forward" />
        <ChoosePlacesBlock direction="return" />
      </div>
      <Button classname="button__further" size="l" style="colored">
        Далее
      </Button>
    </>
  );
};

const ChoosePlacesBlock = ({ direction, time }) => {
  return (
    <div className="places__block">
      <div
        className={cn('places__change-train', {
          'places__change-train_return': direction === 'return',
        })}
      >
        <ArrowInRectangleLarge
          className={cn('arrow-in-rectangle__large', {
            arrow_left: direction === 'return',
          })}
        />
        <Button size="l" style="transparent-dark">
          Выбрать другой поезд
        </Button>
      </div>
      <div className="places__ticket-info">
        <div className="places__ticket-info_train-info">
          <div className="train-info__train-icon_wrapper">
            <TrainIcon className="train-info__train-icon" />
          </div>
          <div className="train-info__trip">
            <Header className="train-info__trip_header" size="xs">
              116C
            </Header>
            <div className="ticket__trip-points">
              Адлер → Москва → Санкт-Петербург
            </div>
          </div>
        </div>
        <div className="places__ticket-info_from-to">
          <TripPoint
            time="18:88"
            city="Екатеринбург"
            station="Московский вокзал"
          />
          <ArrowIcon
            className={cn('trip__direction_icon', {
              arrow_left: direction === 'return',
            })}
          />
          <TripPoint
            time="18:88"
            city="Екатеринбург"
            station="Московский вокзал"
          />
        </div>
        <div className="places__ticket-info_time">
          <div className="icon__wrapper">
            <ClockIcon className="clock__icon" />
          </div>
          <div className="time__text">
            <div className="time__row">9 часов</div>
            <div className="time__row">42 минуты</div>
          </div>
        </div>
      </div>
      <div className="places__ticket-amount">
        <Header className="places__header" size="s">
          Количество билетов
        </Header>
        <form className="ticket-amount__form">
          <div className="ticket-amount__block Grey tmp">
            <TicketAmountInput label="Взрослых" />
            <div className="ticket-amount__block_description">
              Можно добавить еще 3 пассажиров
            </div>
          </div>
          <div className="ticket-amount__block">
            <TicketAmountInput label="Взрослых" />
            <div className="ticket-amount__block_description">
              Можно добавить еще 3 пассажиров
            </div>
          </div>
          <div className="ticket-amount__block">
            <TicketAmountInput label="Взрослых" />
            <div className="ticket-amount__block_description">
              Можно добавить еще 3 пассажиров
            </div>
          </div>
        </form>
      </div>
      <div className="places__railcar-type">
        <Header className="places__header" size="s">
          Тип вагона
        </Header>
        <ul className="railcar-type__buttons">
          {railcarTypes.map((props) => (
            <RailcarTypeButton {...props} />
          ))}
        </ul>
      </div>
      <PlaceSelection railcarClass="fourth_class" />
    </div>
  );
};

const TicketAmountInput = ({ label }) => {
  return (
    <label className="ticket-amount__input_label">
      <span className="ticket-amount__input_text">{label} — </span>
      <input className="ticket-amount__input" placeholder="0" size="3" />
    </label>
  );
};

const RailcarTypeButton = ({ Icon, label, isChecked }) => {
  return (
    <button className={cn('railcar-type__button', { selected: isChecked })}>
      <div className="railcar-type__icon_wrapper">
        <Icon className="railcar-type__icon" />
      </div>
      <div className="railcar-type__title">{label}</div>
    </button>
  );
};
