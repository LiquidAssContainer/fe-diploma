import './style.sass';

import { Header } from 'components/Header';
import {
  OrderBlockItem,
  OrderBlockContainer,
  OrderBlockHeader,
  OrderBlockSection,
} from '../OrderBlock';
import { OrderInput } from '../OrderInput';

export const PaymentStep = () => {
  return (
    <OrderBlockContainer>
      <OrderBlockItem>
        <OrderBlockHeader>
          <Header size="s">Персональные данные</Header>
        </OrderBlockHeader>
        <OrderBlockSection>
          <div className="payment__form_block">
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
          </div>
          <div className="payment__form_block">
            <OrderInput
              label="Контактный телефон"
              type="text"
              placeholder="Иванов"
              name="phone"
            />
          </div>
          <div className="payment__form_block">
            <OrderInput
              label="E-mail"
              type="text"
              placeholder="Иванов"
              name="email"
            />
          </div>
        </OrderBlockSection>
      </OrderBlockItem>

      <OrderBlockItem>
        <OrderBlockHeader>
          <Header size="s">Способ оплаты</Header>
        </OrderBlockHeader>
        <OrderBlockSection></OrderBlockSection>
      </OrderBlockItem>
    </OrderBlockContainer>
  );
};
