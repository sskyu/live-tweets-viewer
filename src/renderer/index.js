import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './containers/main';
import configureStore from './store/configureStore';

const initialState = {};
const store = configureStore(initialState);

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById('root'));
}
