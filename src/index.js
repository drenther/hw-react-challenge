import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'unstated';
import UNSTATED from 'unstated-debug';

import App from './App';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

UNSTATED.logStateChanges = true;

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
