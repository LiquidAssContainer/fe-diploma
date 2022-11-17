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

const patternValues = {
  onlyCyrillic: /^[а-яё]+$/i,
  birthCertificate: /^[ivx]{1,4}[\s-]?[а-я]{2}[\s-]?[\d]{6}$/i,
};

const errorMessages = {
  required: (field) => `Поле «${field}» обязательно для заполнения`,
  onlyCyrillic: (field, gender) => {
    return `${field} ${(() => {
      switch (gender) {
        case 'male':
          return 'должен';
        case 'female':
          return 'должна';
        case 'neuter':
          return 'должно';
      }
    })()} содержать только буквы русского алфавита`;
  },
  // pattern: (field) => `Поле ${field} обязательно для заполнения`,
};

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
  isExpandedProp = false,
  innerRef,
  ...props
}) => {
  const { passengerForms } = useSelector((state) => state.order);
  const form = useForm({
    defaultValues: {
      ticket_type: 'adult',
      document_type: 'passport',
      last_name: '',
      first_name: '',
      patronymic: '',
      birthday: '',
      gender: 'male',
      limited_mobility: false,
    },
    mode: 'onChange',
  });

  const {
    formState: { errors, isSubmitSuccessful, isValid, isValidating },
  } = form;

  const [isExpanded, setIsExpanded] = useState(isExpandedProp);
  const [hasErrors, setHasErrors] = useState(false);
  // const [isValid, setIsValid] = useState(false);
  // const [validationState, setValidationState] = useState(false);

  const { setValue, getValues, watch } = form;

  const watchForm = watch();
  const document_type = watch('document_type');

  const handleSubmit = (data) => {
    onNextPassengerClick(formIndex);
    // if (!Object.keys(errors).length) {
    //   setHasErrors(false);
    // } else {
    //   // setIsValid(false);
    //   setHasErrors(true);
    // }
  };

  const handleChange = () => {
    onFormChange(formIndex, isValid);
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
    onFormChange(formIndex, isValid);
  }, [isValid]);

  // useEffect(() => {
  //   console.log('valid', isValid);
  //   // if (!Object.keys(errors).length) {
  //   //   setHasErrors(false);
  //   // } else {
  //   //   // setIsValid(false);
  //   //   setHasErrors(true);
  //   // }
  // }, [isValid]);

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
                      // required={errorMessages.required('Дата рождения')}
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
                      options={documentTypeOptions}
                      // onSelect={(value) => onSelect('document_type', value)}
                      name="document_type"
                      label="Тип документа"
                      // selected={document_type}
                    />
                    {document_type === 'passport' ? (
                      <>
                        <OrderInput
                          className={errors.series && 'invalid'}
                          name="series"
                          label="Серия"
                          type="number"
                          placeholder="____"
                          required={errorMessages.required('Серия паспорта')}
                          minLength={{
                            value: 1,
                            message: 'Серия паспорта должна состоять из 4 цифр',
                          }}
                          maxLength={{
                            value: 4,
                            message: 'Серия паспорта должна состоять из 4 цифр',
                          }}
                        />
                        <OrderInput
                          className={errors.number && 'invalid'}
                          name="number"
                          label="Номер"
                          type="number"
                          placeholder="______"
                          required={errorMessages.required('Номер паспорта')}
                          minLength={{
                            value: 1,
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
                      </div>
                      {!!Object.keys(errors).length && (
                        <>
                          <Icon
                            wrapperClassName="form__footer_validation-info_icon invalid"
                            icon={CloseIcon}
                          />
                          <div className="form__footer_validation-info_text">
                            {Object.values(errors).map(({ message }) => {
                              return (
                                <div className="form__footer_error-message">
                                  {message}
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                      <Button
                        style="transparent-dark"
                        size="m"
                        type="submit"
                        onClick={handleSubmit}
                        // disabled={!isValid}
                      >
                        Следующий пассажир
                      </Button>
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
