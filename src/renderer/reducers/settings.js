import * as types from '../constants/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = {
  track: []
};

export default handleActions({
  [types.ADD_TRACK]: (state, action) => {
    return {
      ...state,
      track: [
        ...state.track,
        action.payload
      ]
    };
  }
}, initialState)
