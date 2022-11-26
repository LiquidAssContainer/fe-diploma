import './style.sass';

import cn from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useController, useForm, useFormContext } from 'react-hook-form';

import {
  OrderBlockContainer,
  OrderBlockHeader,
  OrderBlockItem,
  OrderBlockSection,
} from '../../OrderBlock';

import {
  OrderInput,
  OrderCheckboxInput,
} from 'components/OrderPage/OrderInput';
import { Icon } from '../../TicketDetails/TicketDetails';
import { OrderBlockHeaderTitle, OrderBlockSectionRow } from '../../OrderBlock';
import { Button } from 'components/Button';
import { NextStepButton } from '../../OrderPage';

import { ReactComponent as PlusIcon } from 'assets/icons/plus_icon.svg';
import { ReactComponent as MinusIcon } from 'assets/icons/minus_icon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close_icon.svg';
import { ReactComponent as CheckedIcon } from 'assets/icons/checked.svg';

import { Form } from 'lib/Form';
import { setNextStep } from 'reducers/stepper';
import {
  PassengerFormAdd,
  PassengerFormGenderRadioGroup,
  PassengerFormHeaderContent,
  PassengerFormIconButton,
  PassengerFormSelect,
} from './PassengersStepComponents';
import { errorMessages, patternValues } from '../helpers';

const ticketTypeOptions = [
  { label: 'Взрослый', value: 'adult' },
  { label: 'Детский', value: 'child' },
];

const documentTypeOptions = [
  { label: 'Паспорт РФ', value: 'passport' },
  { label: 'Свидетельство о рождении', value: 'birth_certificate' },
];

export const PassengerForm = ({
  number,
  onFormChange,
  formIndex,
  passengers,
  onNextPassengerClick,
  onRemovePassenger,
  isExpandedProp = false,
  innerRef,
  isLast,
  ...props
}) => {
  const { passengerForms } = useSelector((state) => state.order);
  const form = useForm({
    defaultValues: {
      ticket_type: 'adult',
      last_name: '',
      first_name: '',
      patronymic: '',
      gender: 'male',
      birthday: '',
      limited_mobility: false,
      document_type: 'passport',
      passport_series: '',
      passport_number: '',
      birth_certificate_number: '',
    },
    mode: 'onChange',
  });

  const {
    formState: { errors, isValid },
  } = form;

  console.log(errors);

  const [isExpanded, setIsExpanded] = useState(isExpandedProp);

  const { setValue, getValues, watch } = form;

  const document_type = watch('document_type');

  const handleSubmit = () => {
    if (isValid) {
      onNextPassengerClick(formIndex);
    }
  };

  const handleChange = () => {
    console.log(getValues());
    onFormChange(getValues(), formIndex, isValid);
  };

  const handleRemovePassenger = () => {
    onRemovePassenger(formIndex);
  };

  useEffect(() => {
    if (passengerForms[formIndex]) {
      const fields = getValues();
      for (const field in fields) {
        setValue(field, passengerForms[formIndex][field]);
      }
    }
  }, []);

  useEffect(() => {
    setIsExpanded(isExpandedProp);
  }, [isExpandedProp]);

  useEffect(() => {
    onFormChange(getValues(), formIndex, isValid);
  }, [isValid]);

  return (
    <OrderBlockContainer {...props}>
      <div ref={innerRef}>
        <Form form={form} onSubmit={handleSubmit} onChange={handleChange}>
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
                {/* {isExpanded && ( */}
                <PassengerFormIconButton
                  type="remove"
                  onClick={handleRemovePassenger}
                  icon={CloseIcon}
                />
                {/* )} */}
              </PassengerFormHeaderContent>
            </OrderBlockHeader>

            {isExpanded && (
              <>
                <OrderBlockSection>
                  <OrderBlockSectionRow>
                    <PassengerFormSelect
                      options={ticketTypeOptions}
                      // onSelect={(value) => onSelect('ticket_type', value)}
                      name="ticket_type"
                      // selected={ticket_type}
                    />
                  </OrderBlockSectionRow>

                  <OrderBlockSectionRow>
                    <OrderInput
                      className={errors.last_name && 'invalid'}
                      label="Фамилия"
                      type="text"
                      placeholder="Иванов"
                      name="last_name"
                      autoComplete="off"
                      required={errorMessages.required('Фамилия')}
                      pattern={{
                        value: patternValues.onlyCyrillic,
                        message: errorMessages.onlyCyrillic(
                          'Фамилия',
                          'female',
                        ),
                      }}
                    />
                    <OrderInput
                      className={errors.first_name && 'invalid'}
                      label="Имя"
                      type="text"
                      placeholder="Иван"
                      name="first_name"
                      autoComplete="off"
                      required={errorMessages.required('Имя')}
                      pattern={{
                        value: patternValues.onlyCyrillic,
                        message: errorMessages.onlyCyrillic('Имя', 'female'),
                      }}
                    />
                    <OrderInput
                      className={errors.patronymic && 'invalid'}
                      label="Отчество"
                      type="text"
                      placeholder="Иванович"
                      name="patronymic"
                      autoComplete="off"
                      pattern={{
                        value: patternValues.onlyCyrillic,
                        message: errorMessages.onlyCyrillic(
                          'Отчество',
                          'neuter',
                        ),
                      }}
                    />
                  </OrderBlockSectionRow>

                  <OrderBlockSectionRow>
                    <PassengerFormGenderRadioGroup name="gender" />
                    <OrderInput
                      className={errors.birthday && 'invalid'}
                      label="Дата рождения"
                      type="date"
                      placeholder="Иванович"
                      name="birthday"
                      size="s"
                      required={errorMessages.required('Дата рождения')}
                    />
                  </OrderBlockSectionRow>

                  <OrderBlockSectionRow>
                    <OrderCheckboxInput
                      name="limited_mobility"
                      label="ограниченная подвижность"
                      textSize="s"
                    />
                  </OrderBlockSectionRow>
                </OrderBlockSection>

                <OrderBlockSection>
                  <OrderBlockSectionRow>
                    <PassengerFormSelect
                      className="document-type"
                      options={documentTypeOptions}
                      // onSelect={(value) => onSelect('document_type', value)}
                      name="document_type"
                      label="Тип документа"
                      // selected={document_type}
                    />
                    {document_type === 'passport' ? (
                      <>
                        <OrderInput
                          className={cn('letter-spacing', {
                            invalid: errors.series,
                          })}
                          name="passport_series"
                          label="Серия"
                          type="number"
                          placeholder="____"
                          required={errorMessages.required('Серия паспорта')}
                          minLength={{
                            value: 4,
                            message: 'Серия паспорта должна состоять из 4 цифр',
                          }}
                          maxLength={{
                            value: 4,
                            message: 'Серия паспорта должна состоять из 4 цифр',
                          }}
                        />
                        <OrderInput
                          className={cn('letter-spacing', {
                            invalid: errors.number,
                          })}
                          name="passport_number"
                          label="Номер"
                          type="number"
                          placeholder="______"
                          // required={errorMessages.required('Номер паспорта')}
                          minLength={{
                            value: 6,
                            message: 'Номер паспорта должен состоять из 6 цифр',
                          }}
                          maxLength={{
                            value: 6,
                            message: 'Номер паспорта должен состоять из 6 цифр',
                          }}
                        />
                      </>
                    ) : (
                      <OrderInput
                        className={errors.birth_certificate_number && 'invalid'}
                        label="Номер"
                        type="text"
                        placeholder="12 символов"
                        name="birth_certificate_number"
                        required={errorMessages.required('Номер свидетельства')}
                        pattern={{
                          value: patternValues.birthCertificate,
                          message:
                            'Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456',
                        }}
                      />
                    )}
                  </OrderBlockSectionRow>
                </OrderBlockSection>

                <div
                  className={cn('form__footer', {
                    valid: isValid,
                    invalid: Object.keys(errors).length,
                  })}
                >
                  <OrderBlockSection>
                    <div className="form__footer_content">
                      <div className="form__footer_validation-info">
                        {isValid && (
                          <>
                            <Icon
                              wrapperClassName="form__footer_validation-info_icon valid"
                              icon={CheckedIcon}
                            />
                            <div className="form__footer_validation-info_text">
                              Готово
                            </div>
                          </>
                        )}
                        {!!Object.keys(errors).length && (
                          <>
                            <Icon
                              wrapperClassName="form__footer_validation-info_icon invalid"
                              icon={CloseIcon}
                            />
                            <ul className="form__footer_validation-info_text">
                              {Object.values(errors).map(({ message }, i) => {
                                return (
                                  <li
                                    key={i}
                                    className="form__footer_error-message"
                                  >
                                    {message}
                                  </li>
                                );
                              })}
                            </ul>
                          </>
                        )}
                      </div>
                      {!Object.keys(errors).length && !isLast && (
                        <Button
                          style="transparent-dark"
                          size="m"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Следующий пассажир
                        </Button>
                      )}
                    </div>
                  </OrderBlockSection>
                </div>
              </>
            )}
          </OrderBlockItem>
        </Form>
      </div>
    </OrderBlockContainer>
  );
};
