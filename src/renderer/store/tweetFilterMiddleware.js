import * as types from '../constants/actionTypes';
import { purgeTweet } from '../actions/tweet';

export default function tweetFilterMiddleware(store) {
  return next => action => {
    if (action.type !== types.RECEIVE_TWEET) {
      return next(action);
    }

    const tweet = action.payload;

    if (isExcludeTweet(tweet.text)) {
      return next(purgeTweet());
    }

    next(action);
  };
}

const excludeRegExp = /^RT\s/;
function isExcludeTweet(text) {
  return excludeRegExp.test(text);
}
