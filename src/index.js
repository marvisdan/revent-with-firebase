import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
const rootEl = document.getElementById('root');

var render  = function() {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    rootEl
  );
}

if(module.hot) {
  module.hot.accept('./app/layout/App', function() {
    setTimeout(render)
  })
}

render();

registerServiceWorker();
