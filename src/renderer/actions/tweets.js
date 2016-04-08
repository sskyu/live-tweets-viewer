import * as types from '../constants/actionTypes';
import { createAction } from 'redux-actions';
import Twitter from '../core/Twitter';

let twitter;

export const initTweets = () => {
  return dispatch => {
    const receiveTweetAction = createAction(types.RECEIVE_TWEET);

    twitter = new Twitter({
      onTweet: (tweet) => {
        dispatch(receiveTweetAction(tweet));
      }
    });

    twitter.startStream();
  };
}

export const purgeTweet = createAction(types.PURGE_TWEET);

export const hideTweet = createAction(types.HIDE_TWEET);
