import React, { PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import BaseComponent from '../core/BaseComponent';

export default class Tweet extends BaseComponent {
  static propTypes = {
    tweet       : PropTypes.object.isRequired,
    style       : PropTypes.object.isRequired,
    windowWidth : PropTypes.number.isRequired,
    onLeave     : PropTypes.func.isRequired
  };

  constructor(...args) {
    super(args);

    /**
     * timer id
     * @type {Number}
     */
    this.timerId = null;
  }

  componentDidMount() {
    const { tweet, onLeave } = this.props;
    this.timerId = setTimeout(() => {
      this.timerId = null;
      onLeave(tweet);
    }, 8000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  render() {
    const { tweet, style, windowWidth } = this.props;
    const { user } = tweet;

    return (
      <article className="component-tweet-wrapper" style={style}>
        <div className="component-tweet-thumbnail" style={{ backgroundImage: `url(${user.profile_image_url})` }}></div>
        <div className="component-tweet-body">
          <div className="component-tweet-name">@{user.screen_name}</div>
          <div className="component-tweet-text">{tweet.text}</div>
        </div>
      </article>
    );
  }
}
