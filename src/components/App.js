import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'styles/App.scss';

import Header from 'components/Header';
import HomePage from 'pages/HomePage';

const App = () => {
  return (    
    <HashRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </div>    
    </HashRouter>
  );
}

export default App;