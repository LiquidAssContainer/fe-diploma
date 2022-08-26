// import { Modal } from 'components/Modal/Modal';
import { SuccessPage } from 'components/SuccessPage';
// import { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer } from './components/Footer';
import { MainPage } from './components/MainPage';
import { OrderPage } from './components/OrderPage';

export const App = () => {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Router>
        <Switch>
          {/* <Route path="/catalog/:id" component={ProductPage} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} /> */}
          <Route path="/success" component={SuccessPage} />
          <Route path="/order/:step?/:stepStage?" component={OrderPage} />
          <Route exact path="/" component={MainPage} />
        </Switch>
      </Router>
      <Footer />
      {/* <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)} /> */}
      {/* <Modal isOpen={isOpen} type="error" handleClose={() => setIsOpen(false)} /> */}
    </>
  );
};
