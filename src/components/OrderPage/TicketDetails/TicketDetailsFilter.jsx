import './style.sass';

import { DateInput } from '../../Input';
import { HoursRangeSlider, RangeSlider } from './RangeSlider';

import { ReactComponent as SecondClassIcon } from 'assets/icons/second_class.svg';
import { ReactComponent as ThirdClassIcon } from 'assets/icons/third_class.svg';
import { ReactComponent as FourthClassIcon } from 'assets/icons/fourth_class.svg';
import { ReactComponent as FirstClassIcon } from 'assets/icons/first_class.svg';
import { ReactComponent as WiFiIcon } from 'assets/icons/wifi.svg';

import { ReactComponent as ArrowInRectangleIcon } from 'assets/icons/arrow_in_rectangle.svg';
import {
  Icon,
  TicketDetails,
  TicketDetailsHeader,
  TicketDetailsSection,
} from './TicketDetails';

const switchList = [
  { name: 'second_class', icon: SecondClassIcon, label: 'Купе' },
  { name: 'third_class', icon: ThirdClassIcon, label: 'Плацкарт' },
  { name: 'fourth_class', icon: FourthClassIcon, label: 'Сидячий' },
  { name: 'first_class', icon: FirstClassIcon, label: 'Люкс' },
  { name: 'wifi', icon: WiFiIcon, label: 'Wi-Fi' },
  { name: 'express', icon: SecondClassIcon, label: 'Экспресс' },
];

export const TicketDetailsFilter = () => {
  return (
    <TicketDetails>
      <form action="" className="ticket-filter__form">
        <TicketDetailsSection isExpandable={false}>
          <div className="ticket-filter__form_dates">
            <label className="ticket-filter__form_label">
              <h4 className="header_size_s text_light ticket-filter__form_title">
                Дата поездки
              </h4>
              <DateInput size="s" />
            </label>
            <label className="ticket-filter__form_label">
              <h4 className="header_size_s text_light ticket-filter__form_title">
                Дата возвращения
              </h4>
              <DateInput size="s" />
            </label>
          </div>
        </TicketDetailsSection>

        <TicketDetailsSection isExpandable={false}>
          <ul className="form__switch_list">
            {switchList.map((props) => (
              <li className="form__switch_item">
                <CheckboxLabel key={props.name} {...props} />
              </li>
            ))}
          </ul>
        </TicketDetailsSection>

        <TicketDetailsSection isExpandable={false}>
          <h4 className="header_size_s text_light">Стоимость</h4>
          <div className="range-slider__container">
            <RangeSlider
              labelSlot={
                <div className="range-slider__from-and-to">
                  <div className="range-slider__from-and-to_item">от</div>
                  <div className="range-slider__from-and-to_item">до</div>
                </div>
              }
            />
          </div>
        </TicketDetailsSection>

        <TicketDetailsSection
          isExpandable={true}
          headerSlot={
            <TicketDetailsHeader
              title="Туда"
              iconSlot={
                <Icon
                  wrapperClassName="ticket-details__icon"
                  icon={ArrowInRectangleIcon}
                />
              }
            />
          }
        >
          <TimeRangeSliders name="forward" />
        </TicketDetailsSection>

        <TicketDetailsSection
          isExpandable={true}
          headerSlot={
            <TicketDetailsHeader
              title="Обратно"
              iconSlot={
                <Icon
                  wrapperClassName="ticket-details__icon arrow_left"
                  icon={ArrowInRectangleIcon}
                />
              }
            />
          }
        >
          <TimeRangeSliders name="return" />
        </TicketDetailsSection>
      </form>
    </TicketDetails>
  );
};

const TimeRangeSliders = ({ name }) => {
  return (
    <div className="range-slider__container">
      <HoursRangeSlider
        name={name}
        labelSlot={<div className="range-slider__title">Время отбытия</div>}
      />
      <HoursRangeSlider
        name={name}
        labelSlot={
          <div className="range-slider__title range-slider__title_right">
            Время прибытия
          </div>
        }
      />
    </div>
  );
};

export const CheckboxLabel = ({ name, label, icon: Icon }) => {
  return (
    <label className="checkbox__label">
      <div className="checkbox__icon_wrapper">
        <Icon className="checkbox__icon" />
      </div>
      <span className="checkbox__label_text">{label}</span>
      <CheckboxInput name={name} />
    </label>
  );
};

export const CheckboxInput = ({ name }) => {
  return (
    <div className="input_checkbox_wrapper">
      <input className="input_checkbox" type="checkbox" name={name} />
      <div className="input_checkbox_slider"></div>
    </div>
  );
};
