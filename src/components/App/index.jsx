import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './styles.styl';

/**
 * App - Description
 * @extends Component
 */
export default class App extends Component {
  /**
   * @static propTypes - Description
   *
   * @return {type} Description
   */
  static get propTypes() {
    return {
      children: PropTypes.node,
      pathname: PropTypes.string,
      modals: PropTypes.object,
    };
  }

  /**
   * constructor - Description
   *
   * @return {type} Description
   */
  constructor() {
    super();

    this.dataLayer = window.dataLayer = window.dataLayer || [];
  }

  /**
   * componentWillMount - Description
   *
   * @return {type} Description
   */
  componentWillMount() {
    console.log('app will mount');

    const tags = window.location.pathname.split('/').splice(2);
    this.dataLayer.push({
      tags: _.size(tags) ? tags : [],
    });
  }

  /**
   * componentDidMount - Description
   *
   * @return {type} Description
   */
  componentDidMount() {}

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { children } = this.props;

    console.log('rendering app');

    return (
      <div data-component="App">
        <div id="page-content" className="page-content">
          {children}
        </div>
      </div>
    );
  }
}
