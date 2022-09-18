import { Modal } from 'components/Modal/Modal';
import { SuccessPage } from 'components/SuccessPage';
import { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer } from './components/Footer';
import { MainPage } from './components/MainPage';
import { OrderPage } from './components/OrderPage';

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/success" component={SuccessPage} />
          <Route component={OrderPage} />
        </Switch>
      </Router>
      <Footer />
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      {/* <Modal isOpen={isOpen} type="error" handleClose={() => setIsOpen(false)} /> */}
    </>
  );
};
