import './style.sass';

import { Header } from 'components/Header';
import {
  OrderBlockItem,
  OrderBlockContainer,
  OrderBlockHeader,
  OrderBlockSection,
  OrderBlockSectionRow,
} from '../OrderBlock';
import { OrderInput, OrderCheckboxInput } from '../OrderInput';
import { Button } from 'components/Button';
import { NextStepButton } from '../OrderPage';

export const PaymentStep = () => {
  return (
    <>
      <OrderBlockContainer>
        <form>
          <OrderBlockItem>
            <OrderBlockHeader>
              <Header size="s">Персональные данные</Header>
            </OrderBlockHeader>

            <OrderBlockSection>
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
                  placeholder="Иванов"
                  name="name"
                />
                <OrderInput
                  label="Отчество"
                  type="text"
                  placeholder="Иванов"
                  name="patronym"
                />
              </OrderBlockSectionRow>

              <OrderBlockSectionRow>
                <OrderInput
                  label="Контактный телефон"
                  type="text"
                  placeholder="Иванов"
                  name="phone"
                />
              </OrderBlockSectionRow>

              <OrderBlockSectionRow>
                <OrderInput
                  label="E-mail"
                  type="text"
                  placeholder="Иванов"
                  name="email"
                />
              </OrderBlockSectionRow>
            </OrderBlockSection>
          </OrderBlockItem>

          <OrderBlockItem>
            <OrderBlockHeader>
              <Header size="s">Способ оплаты</Header>
            </OrderBlockHeader>
            <OrderBlockSection>
              <OrderCheckboxInput
                label="Онлайн"
                type="radio"
                name="payment-method"
              />
              <fieldset className="online-payment-methods" disabled={false}>
                <OnlinePaymentRadioItem
                  label="Банковской картой"
                  value="card"
                />
                <OnlinePaymentRadioItem label="PayPal" value="paypal" />
                <OnlinePaymentRadioItem label="Visa QIWI Wallet" value="qiwi" />
              </fieldset>
            </OrderBlockSection>
            <OrderBlockSection>
              <OrderCheckboxInput
                label="Наличными"
                type="radio"
                name="payment-method"
              />
            </OrderBlockSection>
          </OrderBlockItem>
        </form>
      </OrderBlockContainer>

      <NextStepButton>Купить билеты</NextStepButton>
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
          name="online-payment"
          value={value}
        />
        <span className="online-payment-methods__label_text">{label}</span>
      </label>
    </div>
  );
};
