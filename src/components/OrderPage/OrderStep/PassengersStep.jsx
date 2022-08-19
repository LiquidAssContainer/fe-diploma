import {
  OrderBlockContainer,
  OrderBlockHeader,
  OrderBlockItem,
  OrderBlockSection,
} from '../OrderBlock';
import { OrderInput } from '../OrderInput';

export const PassengersStep = () => {
  return <PassengerForm />;
};

const PassengerForm = () => {
  return (
    <OrderBlockContainer>
      <OrderBlockItem>
        <OrderBlockHeader>
          <button>−</button>
          <div>Пассажир 1</div>
          <button>×</button>
        </OrderBlockHeader>
        <OrderBlockSection>
          <OrderInput label="Фамилия" type="text" placeholder="" name/>
        </OrderBlockSection>
      </OrderBlockItem>
    </OrderBlockContainer>
  );
};
