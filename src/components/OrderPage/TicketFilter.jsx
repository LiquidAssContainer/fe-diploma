import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { DateInput } from '../Input';
import { ReactComponent as SecondClassIcon } from '../../assets/icons/second_class.svg';
import { ReactComponent as ThirdClassIcon } from '../../assets/icons/third_class.svg';
import { ReactComponent as FourthClassIcon } from '../../assets/icons/fourth_class.svg';
import { ReactComponent as FirstClassIcon } from '../../assets/icons/first_class.svg';
import { ReactComponent as WiFiIcon } from '../../assets/icons/wifi.svg';

import { ReactComponent as ArrowInRectangleIcon } from '../../assets/icons/arrow_in_rectangle.svg';
import { ReactComponent as ExpandBtnIcon } from '../../assets/icons/expand.svg';

const switchList = [
  { name: 'second_class', Icon: SecondClassIcon, label: 'Купе' },
  { name: 'third_class', Icon: ThirdClassIcon, label: 'Плацкарт' },
  { name: 'fourth_class', Icon: FourthClassIcon, label: 'Сидячий' },
  { name: 'first_class', Icon: FirstClassIcon, label: 'Люкс' },
  { name: 'wifi', Icon: WiFiIcon, label: 'Wi-Fi' },
  { name: 'express', Icon: SecondClassIcon, label: 'Экспресс' },
];

export const TicketFilter = () => {
  return (
    <form action="" className="ticket-filter__form">
      <div className="ticket-filter__form_section">
        <label className="ticket-filter__form_label">
          <h4 className="header_size_s text_light ticket-filter__title">
            Дата поездки
          </h4>
          <DateInput className="form__input" size="small" />
        </label>
        <label className="ticket-filter__form_label">
          <h4 className="header_size_s text_light ticket-filter__title">
            Дата возвращения
          </h4>
          <DateInput className="form__input" size="small" />
        </label>
      </div>

      <div className="ticket-filter__form_section">
        <ul className="form__switch_list">
          {switchList.map((props) => (
            <li className="form__switch_item">
              <CheckboxLabel key={props.name} {...props} />
            </li>
          ))}
        </ul>
      </div>

      <div className="ticket-filter__form_section">
        <h4 className="header_size_s text_light">Стоимость</h4>
        <RangeSlider />
      </div>

      <div className="ticket-filter__form_section">
        <header className="ticket-filter__form_header">
          <div className="ticket-filter__arrow_wrapper">
            <ArrowInRectangleIcon className="ticket-filter__arrow" />
          </div>
          <h4 className="header_size_s text_light">Туда</h4>
          <button className="ticket-filter__button_expand">
            <ExpandBtnIcon className="button_expand_icon" />
          </button>
        </header>
      </div>
      <div className="ticket-filter__form_section">
        <header className="ticket-filter__form_header">
          <div className="ticket-filter__arrow_wrapper">
            <ArrowInRectangleIcon className="ticket-filter__arrow arrow_left" />
          </div>
          <h4 className="header_size_s text_light">Обратно</h4>
          <button className="ticket-filter__button_expand">
            <ExpandBtnIcon className="button_expand_icon" />
          </button>
        </header>
      </div>
    </form>
  );
};

const CheckboxLabel = ({ name, Icon, label }) => {
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

const CheckboxInput = ({ name }) => {
  return (
    <div className="input_checkbox_wrapper">
      <input className="input_checkbox" type="checkbox" name={name} />
      <div className="input_checkbox_slider"></div>
    </div>
  );
};

const RangeSlider = () => {
  return (
    <div className="range-slider">
      <div className="range-slider__from-and-to">
        <div className="range-slider__from-and-to_item">от</div>
        <div className="range-slider__from-and-to_item">до</div>
      </div>
      <Slider
        min={1920}
        max={6000}
        range
        trackStyle={{
          backgroundColor: '#FFA800',
          height: 19,
        }}
        handleStyle={{
          borderColor: 'fff',
          height: 24,
          width: 24,
          backgroundColor: 'fff',
          border: 'none',
          opacity: 1,
          marginTop: -2.5,
        }}
        railStyle={{
          backgroundColor: '#3E3C41',
          height: 19,
          borderRadius: 8,
          border: '1px solid #C4C4C4',
          // paddingInline: 40,
        }}
        marks={{
          1920: {
            label: 'Шилов',
            style: {
              transform: 'translateY(100%)',
              fontSize: 16,
              color: '#E5E5E5',
            },
          },
          4500: `4500`,
          6000: {
            label: 7000,
            style: {
              transform: 'translateY(100%), translateX(100%)',
              fontSize: 16,
              color: '#E5E5E5',
            },
          },
        }}
        tipFormatter={(value) => <span className="tooltip">{value}€</span>}
        dotStyle={{ display: 'none' }}
        // markStyle={{color: 'red'}}
      />
    </div>
  );
};
