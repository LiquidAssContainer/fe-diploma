
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer } from './components/Footer';
import { MainPage } from './components/MainPage';

export const App = () => {
  return (
    <>
    <Router>
      <Switch>
        {/* <Route path="/catalog/:id" component={ProductPage} />
        <Route path="/catalog" component={Catalog} />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/cart" component={Cart} /> */}
        <Route exact path="/" component={MainPage}/>
      </Switch>
    </Router>
    <Footer/>
    </>
  );
};
