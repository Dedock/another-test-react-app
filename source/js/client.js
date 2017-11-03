import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from 'config/store';
import App from 'views/App';

import es6Promise from 'es6-promise';
import 'isomorphic-fetch';

// Load SCSS
import '../scss/app.scss';

es6Promise.polyfill();

const store = configureStore();

window.onbeforeunload = () => {
  const { app } = store.getState();
  localStorage.setItem('notes', JSON.stringify(app.get('notes')));
};

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <MuiThemeProvider>
          <Component />
        </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render app
render(App);

if (module.hot) {
  module.hot.accept('./views/App/', () => {
    const NewClient = require('./views/App/index').default; // eslint-disable-line global-require

    render(NewClient);
  });
}
