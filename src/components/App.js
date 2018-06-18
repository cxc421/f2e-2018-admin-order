import React from 'react';
import { HashRouter } from 'react-router-dom';
import 'styles/App.scss';

import Header from 'components/Header';

const App = () => {
  return (    
    <HashRouter>
      <div className="app">
        <Header />
        
      </div>    
    </HashRouter>
  );
}

export default App;