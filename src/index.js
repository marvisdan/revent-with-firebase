import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './app/store/configureStore';
import  ScrollToTop from './app/common/util/ScrollToTop';
import { loadEvents } from './features/event/eventActions';

const store = configureStore();
store.dispatch(loadEvents());

const rootEl = document.getElementById('root');

var render  = function() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <ReduxToastr
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
          />
          <App />
        </ScrollToTop>
      </Router>
    </Provider>,
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
