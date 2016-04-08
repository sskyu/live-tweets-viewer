import { combineReducers } from 'redux';
import tweets from './tweets';
import settings from './settings';

export default combineReducers({
  tweets,
  settings
});
