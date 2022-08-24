import './style.sass';

import { DateInput } from '../../Input';
import { RangeSlider } from './RangeSlider';

import { ReactComponent as SecondClassIcon } from 'assets/icons/second_class.svg';
import { ReactComponent as ThirdClassIcon } from 'assets/icons/third_class.svg';
import { ReactComponent as FourthClassIcon } from 'assets/icons/fourth_class.svg';
import { ReactComponent as FirstClassIcon } from 'assets/icons/first_class.svg';
import { ReactComponent as WiFiIcon } from 'assets/icons/wifi.svg';

import { ReactComponent as ArrowInRectangleIcon } from 'assets/icons/arrow_in_rectangle.svg';
import {
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
      <form action="" className="ticket-details__form">
        <TicketDetailsSection isExpandable={false}>
          <label className="ticket-filter__form_label">
            <h4 className="header_size_s text_light ticket-filter__title">
              Дата поездки
            </h4>
            <DateInput size="s" />
          </label>
          <label className="ticket-filter__form_label">
            <h4 className="header_size_s text_light ticket-filter__title">
              Дата возвращения
            </h4>
            <DateInput size="s" />
          </label>
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
          <RangeSlider />
        </TicketDetailsSection>

        <TicketDetailsSection
          isExpandable={true}
          headerSlot={
            <TicketDetailsHeader
              iconSlot={
                <div className="ticket-filter__arrow">
                  <ArrowInRectangleIcon className="ticket-filter__arrow_icon" />
                </div>
              }
            >
              Туда
            </TicketDetailsHeader>
          }
        >
          <RangeSlider />
        </TicketDetailsSection>

        <TicketDetailsSection
          isExpandable={true}
          headerSlot={
            <TicketDetailsHeader
              iconSlot={
                <div className="ticket-filter__arrow">
                  <ArrowInRectangleIcon className="ticket-filter__arrow_icon arrow_left" />
                </div>
              }
            >
              Обратно
            </TicketDetailsHeader>
          }
        >
          <RangeSlider />
        </TicketDetailsSection>
      </form>
    </TicketDetails>
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
