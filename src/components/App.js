import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'styles/App.scss';

import Header from 'components/Header';
import HomePage from 'pages/HomePage';
import OrderPage from 'pages/OrderPage';

const App = () => {
  return (    
    <HashRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/orders" component={OrderPage} />
        </Switch>
      </div>    
    </HashRouter>
  );
}

export default App;