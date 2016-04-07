import * as types from '../constants/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions({
  [types.RECEIVE_TWEETS]: (state, actions) => [
    ...state,
    ...actions.payload
  ],

  [types.RECEIVE_TWEET]: (state, actions) => [
    ...state,
    actions.payload
  ],

  [types.HIDE_TWEET]: (state, actions) => {
    return state.filter(tweet => tweet.id !== actions.payload.id);
  }
}, initialState);
