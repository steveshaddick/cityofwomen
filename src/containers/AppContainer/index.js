import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import App from 'components/App';

/**
 * anonymous function - description
 *
 * @param  {type} state description
 * @return {type}       description
 */
const mapStateToProps = function(state) {
  const { routing, modals } = state;

  return {
    pathname: routing.location.pathname,
    modals,
  };
};

/**
 * mapDispatchToProps - Description
 *
 * @param {type} dispatch Description
 *
 * @return {type} Description
 */
const mapDispatchToProps = function() {
  return {};
};

/**
 *
 */
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
