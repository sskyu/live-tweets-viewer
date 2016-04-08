import React, { PropTypes } from 'react';
import BaseComponent from '../core/BaseComponent';

export default class Setting extends BaseComponent {
  static propTypes = {
  }

  render() {
    return (
      <div>
        <input type="text" />
        <button>close</button>
      </div>
    );
  }
}
