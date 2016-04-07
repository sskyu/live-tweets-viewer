import Twit from 'twit';
import config from '../../config';

const twitConfig = Object.assign({}, config.twitter, {});

export default class Twitter {
  constructor(params = {}) {
    this.twit = new Twit(twitConfig);
    this.isStreamStart = null;
    this.stream = null;
    this.onTweet = params.onTweet || (() => {});
  }

  destroy() {
    this.twit = null;
    this.isStreamStart = null;
    if (this.stream) {
      this.stopStream();
    }
    this.stream = null;
    this.onMessage = null;
  }

  startStream() {
    if (this.isStreamStart) {
      return;
    }

    this.stream = this.twit.stream('statuses/filter', {
      // track: ['#jspocycle']
      track: ['#japan']
      // track: ['#splatoon']
    });

    this._bindEvents();

    this.isStreamStart = true;
  }

  stopStream() {
    this.stream && this.stream.stop();
    this.isStreamStart = null;
  }

  _bindEvents() {
    this.stream.on('message', (message) => {
    });

    this.stream.on('tweet', (tweet) => {
      if (typeof this.onTweet === 'function') {
        this.onTweet(tweet);
      }
    });
  }
}
