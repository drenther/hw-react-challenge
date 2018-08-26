import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'unstated';

import App from './App';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
