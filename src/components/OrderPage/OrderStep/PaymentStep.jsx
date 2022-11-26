import './style.sass';

import { useForm } from 'react-hook-form';

import { Header } from 'components/Header';
import {
  OrderBlockItem,
  OrderBlockContainer,
  OrderBlockHeader,
  OrderBlockSection,
  OrderBlockSectionRow,
} from '../OrderBlock';
import { OrderInput, OrderCheckboxInput } from '../OrderInput';
import { ChangeStepButton, NextStepButton, PrevStepButton } from '../OrderPage';
import { Form } from 'lib/Form';
import { FullnameInputBlock } from './FullnameInputBlock';
import { errorMessages, patternValues } from './helpers';
import { setPrevStep } from 'reducers/stepper';
import { useDispatch } from 'react-redux';
import { OrderRadioInput } from '../OrderInput/OrderInput';
import { setUserData } from 'reducers/order';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const PaymentStep = () => {
  const { userData } = useSelector((state) => state.order);

  const form = useForm({
    defaultValues: {
      last_name: '',
      first_name: '',
      patronymic: '',
      phone: '',
      email: '',
      payment_method: 'online',
      online_payment_type: '',
    },
    mode: 'onChange',
  });

  const {
    formState: { errors, isValid },
    getValues,
    setValue,
  } = form;

  const dispatch = useDispatch();

  const handleNextStepClick = () => {
    const formData = getValues();
    dispatch(setUserData(formData));
  };

  useEffect(() => {
    if (userData) {
      const fields = getValues();
      for (const field in fields) {
        setValue(field, userData[field]);
      }
    }
  }, []);

  return (
    <>
      <OrderBlockContainer>
        {/* <Form form={form} onSubmit={handleSubmit} onChange={handleChange}> */}
        <Form form={form} onChange={() => console.log(getValues())}>
          <OrderBlockItem>
            <OrderBlockHeader>
              <Header size="s">Персональные данные</Header>
            </OrderBlockHeader>

            <OrderBlockSection>
              <FullnameInputBlock errors={errors} />

              <OrderBlockSectionRow>
                <OrderInput
                  label="Контактный телефон"
                  type="text"
                  placeholder="+7 ___ ___ __ __"
                  name="phone"
                  isValid={!errors.phone}
                  required={errorMessages.required('Контактный телефон')}
                  pattern={{
                    value: patternValues.phone,
                    message: errorMessages.onlyCyrillic('Фамилия', 'female'),
                  }}
                />
              </OrderBlockSectionRow>

              <OrderBlockSectionRow>
                <OrderInput
                  label="E-mail"
                  type="text"
                  placeholder="inbox@gmail.ru"
                  name="email"
                  isValid={!errors.email}
                  required={errorMessages.required('E-mail')}
                  pattern={{
                    value: patternValues.email,
                    message: errorMessages.onlyCyrillic('Фамилия', 'female'),
                  }}
                />
              </OrderBlockSectionRow>
            </OrderBlockSection>
          </OrderBlockItem>

          <OrderBlockItem>
            <OrderBlockHeader>
              <Header size="s">Способ оплаты</Header>
            </OrderBlockHeader>
            <OrderBlockSection>
              <OrderRadioInput
                label="Онлайн"
                type="radio"
                name="payment_method"
                value="online"
                id="online"
                // value={value}
                // isChecked={isChecked}
                // onChange={onChange}
              />
              <fieldset
                className="online-payment-methods"
                disabled={getValues('payment_method') !== 'online'}
              >
                <OnlinePaymentRadioItem
                  label="Банковской картой"
                  value="card"
                />
                <OnlinePaymentRadioItem label="PayPal" value="paypal" />
                <OnlinePaymentRadioItem label="Visa QIWI Wallet" value="qiwi" />
              </fieldset>
            </OrderBlockSection>
            <OrderBlockSection>
              <OrderRadioInput
                label="Наличными"
                type="radio"
                name="payment_method"
                value="cash"
                id="cash"
              />
            </OrderBlockSection>
          </OrderBlockItem>
        </Form>
      </OrderBlockContainer>

      <div className="step-buttons__container">
        <PrevStepButton type="prev">Назад</PrevStepButton>
        <NextStepButton onClick={handleNextStepClick} disabled={!isValid}>
          Купить билеты
        </NextStepButton>
      </div>
    </>
  );
};

const OnlinePaymentRadioItem = ({ label, value }) => {
  return (
    <div className="online-payment-methods__item">
      <label className="online-payment-methods__label">
        <input
          className="online-payment-methods__input"
          type="radio"
          name="online_payment"
          value={value}
        />
        <span className="online-payment-methods__label_text">{label}</span>
      </label>
    </div>
  );
};
