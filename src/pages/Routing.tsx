import {
  CheckStep,
  PaymentStep,
  SearchTickets,
} from 'components/OrderPage/OrderStep';
import { ChoosePlaces } from 'components/OrderPage/OrderStep/ChoosePlacesStep';
import { PassengersStep } from 'components/OrderPage/OrderStep/PassengersStep';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { lazy } from 'shared/lib';

const MainPage = lazy(() => import('components/MainPage'), 'MainPage');
const SuccessPage = lazy(() => import('pages/success'), 'SuccessPage');
const OrderPage = lazy(
  () => import('components/OrderPage') as any,
  'OrderPage',
);

export const Routing: FC = () => {
  const { step } = useSelector((state: RootState) => state.steps);

  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/success">
        {step === 5 ? <SuccessPage /> : <Redirect to="/" />}
      </Route>
      <Route>
        <OrderPage>
          <Switch>
            <Route path="/search" component={SearchTickets} />
            <Route path="/seats/:id/order">
              {() => {
                switch (step) {
                  case 1:
                    return (
                      <Switch>
                        <Redirect from="/seats/:id/order" to="/seats/:id" />
                      </Switch>
                    );
                  case 2:
                    return <PassengersStep />;
                  case 3:
                    return <PaymentStep />;
                  // case 4:
                  default:
                    return <CheckStep />;
                }
              }}
            </Route>
            <Route path="/seats/:id" component={ChoosePlaces} />
          </Switch>
        </OrderPage>
      </Route>
    </Switch>
  );
};
