import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

/**
 *
 *
 * @export
 * @class AboutPage
 * @extends {React.Component}
 */
export class AboutPage extends React.Component {
  /**
   *
   *
   * @readonly
   * @static
   *
   * @memberOf Homepage
   */
  static get propTypes() {
    return {
      description: PropTypes.string,
    };
  }

  /**
   *
   *
   * @returns
   *
   * @memberOf Homepage
   */
  render() {
    return <div data-component="AboutPage">AboutPage</div>;
  }
}

/**
 *
 */
export default connect()(AboutPage);
