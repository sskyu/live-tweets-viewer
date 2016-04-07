import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tweetActions from '../actions/tweet';
import { initTweets, hideTweet } from '../actions/tweet';
import Tweet from '../components/Tweet';

function mapStateToProps(state) {
  return {
    tweets: state.tweets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tweetActions: bindActionCreators(tweetActions, dispatch)
  };
}

export class Main extends Component {
  constructor(...args) {
    super(args);

    /**
     * width of the window
     * @type {Number}
     */
    this.windowWidth = null;
  }

  componentWillMount() {
    const { tweetActions } = this.props;
    tweetActions.initTweets();
  }

  componentDidMount() {
    this.windowWidth = window.innerWidth;
  }

  componentWillUnmount() {
    this.windowWidth = null;
  }

  render() {
    const { tweets, tweetActions } = this.props;
    const windowWidth = window.innerWidth;

    return (
      <div className="container-main-wrapper">
        <TransitionMotion
          willEnter={this.getDefaultStyle.bind(this)}
          willLeave={this.willLeave.bind(this)}
          defaultStyles={this.getDefaultTransitionStyles()}
          styles={this.getTransitionStyles()}
        >
          {styles =>
            <div>
              {styles.map(({ key, style, data }) =>
                <Tweet
                  key={key}
                  tweet={data}
                  style={Object.assign({}, style, { transform: `translateX(${style.x}px)` } )}
                  windowWidth={windowWidth}
                  onLeave={tweetActions.hideTweet}
                />
              )}
            </div>
          }
        </TransitionMotion>
      </div>
    );
  }

  getDefaultStyle() {
    const { windowWidth } = this;
    return {
      opacity: 0,
      scale: 0.9,
      x: windowWidth * -1
    };
  }

  willEnter() {
    return this.getDefaultStyle();
  }

  willLeave() {
    const { windowWidth } = this;
    return {
      opacity: spring(0),
      scale: spring(0),
      x: spring(-1 * windowWidth)
    };
  }

  getDefaultTransitionStyles() {
    const { tweets } = this.props;
    const { windowWidth } = this;
    const style = this.getDefaultStyle();
    return tweets.map(tweet => {
      return {
        data: tweet,
        key: `transition-${tweet.id}`,
        style
      };
    });
  }

  getTransitionStyles() {
    const { tweets } = this.props;
    return tweets.map(tweet => {
      return {
        data: tweet,
        key: `transition-${tweet.id}`,
        style: {
          opacity: spring(1),
          scale: spring(1),
          x: spring(0)
        }
      };
    });
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
