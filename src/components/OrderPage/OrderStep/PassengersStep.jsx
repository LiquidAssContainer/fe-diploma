import './style.sass';

import cn from 'classnames';
import { useState } from 'react';

import {
  OrderBlockContainer,
  OrderBlockHeader,
  OrderBlockItem,
  OrderBlockSection,
} from '../OrderBlock';
import { OrderInput } from '../OrderInput';
import { Icon } from '../TicketDetails/TicketDetails';
import { Header } from 'components/Header';
import {
  OrderBlockHeaderTitle,
  OrderBlockSectionRow,
} from '../OrderBlock/OrderBlock';
import { Button } from 'components/Button';
import { OrderCheckboxInput } from '../OrderInput/OrderInput';
import { ReactComponent as ExpandIcon } from 'assets/icons/plus_icon.svg';
import { ReactComponent as ShrinkIcon } from 'assets/icons/minus_icon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close_icon.svg';

const ticketTypeOptions = [
  { label: 'Взрослый', value: 'adult' },
  { label: 'Детский', value: 'child' },
];

const documentTypeOptions = [
  { label: 'Паспорт РФ', value: 'adult' },
  { label: 'Свидетельство о рождении', value: 'child' },
];

const passengers = [1, 2, 3];

export const PassengersStep = () => {
  return (
    <>
      {passengers.map((passenger) => (
        <PassengerForm isExpanded={false} />
      ))}

      <PassengerFormAdd />
    </>
  );
};

const PassengerForm = ({ number, isExpandedd }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <OrderBlockContainer>
      <form>
        <OrderBlockItem>
          <OrderBlockHeader>
            <PassengerFormIconButton
              type="expand"
              onClick={() => setIsExpanded(!isExpanded)}
              icon={isExpanded ? ShrinkIcon : ExpandIcon}
            />
            <OrderBlockHeaderTitle>Пассажир {number}</OrderBlockHeaderTitle>
            <PassengerFormIconButton
              type="remove"
              onClick={() => passengers.splice(number - 1, 1)}
              icon={CloseIcon}
            />
          </OrderBlockHeader>

          {isExpanded && (
            <>
              <OrderBlockSection>
                <OrderBlockSectionRow>
                  <PassengerFormSelect options={ticketTypeOptions} />
                </OrderBlockSectionRow>

                <OrderBlockSectionRow>
                  <OrderInput
                    label="Фамилия"
                    type="text"
                    placeholder="Иванов"
                    name="lastname"
                  />
                  <OrderInput
                    label="Имя"
                    type="text"
                    placeholder="Иван"
                    name="firstname"
                  />
                  <OrderInput
                    label="Отчество"
                    type="text"
                    placeholder="Иванович"
                    name="patronym"
                  />
                </OrderBlockSectionRow>

                <OrderBlockSectionRow>
                  <PassengerFormGenderRadioGroup />
                </OrderBlockSectionRow>

                <OrderBlockSectionRow>
                  <OrderCheckboxInput
                    name="limited-mobility"
                    label="ограниченная подвижность"
                  />
                </OrderBlockSectionRow>
              </OrderBlockSection>

              <OrderBlockSection>
                <OrderBlockSectionRow>
                  <PassengerFormSelect
                    options={documentTypeOptions}
                    name="document-type"
                    label="Тип документа"
                  />
                  <OrderInput />
                </OrderBlockSectionRow>
              </OrderBlockSection>

              <OrderBlockSection>
                <Button>Следующий пассажир</Button>
              </OrderBlockSection>
            </>
          )}
        </OrderBlockItem>
      </form>
    </OrderBlockContainer>
  );
};

const PassengerFormAdd = () => {
  return (
    <OrderBlockContainer>
      {/* <PassengerFormHeaderContent> */}
      <OrderBlockHeaderTitle>Добавить пассажира</OrderBlockHeaderTitle>
      <PassengerFormIconButton type="add" icon={ExpandIcon} />
      {/* </PassengerFormHeaderContent> */}
    </OrderBlockContainer>
  );
};

const PassengerFormHeaderContent = ({ children }) => {
  return <div className="passenger-form__header_content">{children}</div>;
};

const PassengerFormIconButton = ({ className, type, onClick, icon }) => {
  return (
    <button
      className={cn(`passenger-form__button_${type}`, className)}
      type="button"
      onClick={onClick}
    >
      <Icon wrapperClassName="passenger-form__button_icon" icon={icon} />
    </button>
  );
};

const PassengerFormGenderRadioGroup = ({ checked }) => {
  return (
    <fieldset className="passenger-form__fieldset order__input_container">
      <legend className="passenger-form__legend order__input_label">Пол</legend>
      <PassengerFormGenderRadioInput
        value="male"
        label="М"
        name="gender"
        isChecked
      />
      <PassengerFormGenderRadioInput value="female" label="Ж" name="gender" />
    </fieldset>
  );
};

const PassengerFormGenderRadioInput = ({ value, label, name, isChecked }) => {
  return (
    <label className="passenger-form__radio_label">
      <input
        className="passenger-form__radio_input"
        type="radio"
        value={value}
        name={name}
        isChecked={isChecked}
      />
      <span className="passenger-form__radio_text">{label}</span>
    </label>
  );
};

const PassengerFormSelect = ({ options, label, name }) => {
  return (
    <div className="order__input_container">
      {label && <label className="order__input_label">{label}</label>}
      <select name={name}>
        {options.map(({ value, label }) => (
          <PassengerFormOption value={value} label={label} />
        ))}
      </select>
    </div>
  );
};

const PassengerFormOption = ({ value, label }) => {
  return <option value={value}>{label}</option>;
};
