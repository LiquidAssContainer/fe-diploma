import { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { lazy } from 'shared/lib';

const MainPage = lazy(() => import('components/MainPage'), 'MainPage');
const SuccessPage = lazy(() => import('components/SuccessPage'), 'SuccessPage');
const OrderPage = lazy(
  () => import('components/OrderPage') as any,
  'OrderPage',
);

export const Routing: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/success" component={SuccessPage} />
        <Route component={OrderPage} />
      </Switch>
    </Router>
  );
};
