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
import { OrderBlockHeaderTitle, OrderBlockSectionRow } from '../OrderBlock';
import { Button } from 'components/Button';
import { OrderCheckboxInput } from '../OrderInput';
import { Select } from 'components/Select';

import { ReactComponent as PlusIcon } from 'assets/icons/plus_icon.svg';
import { ReactComponent as MinusIcon } from 'assets/icons/minus_icon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close_icon.svg';
import { ReactComponent as CheckedIcon } from 'assets/icons/checked.svg';

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
        <PassengerForm number={passenger} isExpanded={false} />
      ))}
      <PassengerFormAdd />
    </>
  );
};

const PassengerForm = ({ number, isExpandedd }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <OrderBlockContainer>
      <form>
        <OrderBlockItem>
          <OrderBlockHeader>
            <PassengerFormHeaderContent>
              <PassengerFormIconButton
                className={isExpanded && 'expanded'}
                type="expand"
                onClick={() => setIsExpanded(!isExpanded)}
                icon={isExpanded ? MinusIcon : PlusIcon}
              />
              <OrderBlockHeaderTitle title={`Пассажир ${number}`} />
              {isExpanded && (
                <PassengerFormIconButton
                  type="remove"
                  onClick={() => passengers.splice(number - 1, 1)}
                  icon={CloseIcon}
                />
              )}
            </PassengerFormHeaderContent>
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
                  <OrderInput
                    label="Дата рождения"
                    type="date"
                    placeholder="Иванович"
                    name="birthday"
                  />
                </OrderBlockSectionRow>

                <OrderBlockSectionRow>
                  <OrderCheckboxInput
                    name="limited-mobility"
                    label="ограниченная подвижность"
                    textSize="s"
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
                  <OrderInput
                    label="Серия"
                    type="number"
                    placeholder="____"
                    name="birthday"
                  />
                  <OrderInput
                    label="Номер"
                    type="number"
                    placeholder="______"
                    name="birthday"
                  />
                </OrderBlockSectionRow>
              </OrderBlockSection>

              <div className="form__footer">
                {/* <div className="form__footer validated"> */}
                <OrderBlockSection>
                  <div className="form__footer_content">
                    {/* <div className="form__footer_validation-info">
                      <Icon
                        wrapperClassName="form__footer_validation-info_icon validated"
                        icon={CheckedIcon}
                      />
                      <div className="form__footer_validation-info_text">
                        Готово
                      </div>
                    </div> */}
                    <Button style="transparent-dark" size="m">
                      Следующий пассажир
                    </Button>
                  </div>
                </OrderBlockSection>
              </div>
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
      <OrderBlockHeader>
        <PassengerFormHeaderContent>
          <OrderBlockHeaderTitle title="Добавить пассажира" />
          <PassengerFormIconButton type="add" icon={PlusIcon} />
        </PassengerFormHeaderContent>
      </OrderBlockHeader>
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
      <Icon
        wrapperClassName={`passenger-form__button_${type}_icon`}
        icon={icon}
      />
    </button>
  );
};

const PassengerFormGenderRadioGroup = ({ checked }) => {
  return (
    <fieldset className="passenger-form__fieldset order__input_container">
      <legend className="passenger-form__legend order__input_label">Пол</legend>
      <div className="passenger-form__radio_container">
        <PassengerFormGenderRadioInput
          value="male"
          label="М"
          name="gender"
          isChecked
        />
        <PassengerFormGenderRadioInput value="female" label="Ж" name="gender" />
      </div>
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
        checked={isChecked}
      />
      <span className="passenger-form__radio_text">{label}</span>
    </label>
  );
};

const PassengerFormSelect = ({ options, label, name }) => {
  return (
    <div className="order__input_container">
      {label && <label className="order__input_label">{label}</label>}
      <Select className="passenger-form__select" optionsList={options} />
    </div>
  );
};
