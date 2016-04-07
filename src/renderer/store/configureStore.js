import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import tweetFilterMiddleware from './tweetFilterMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
  });

  let middlewares = [
    thunkMiddleware,
    tweetFilterMiddleware,
    loggerMiddleware
  ];

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  window.store = store;

  return store;
}
