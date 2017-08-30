import { connect } from 'react-redux';

import _ from 'lodash';

import Page from 'components/Page';

import { getPage } from '../../redux/actions/page';

//import { normalizePathname } from '../../libs/contentful';
/**
 * anonymous function - description
 *
 * @param  {type} state description
 * @return {type}       description
 */
const mapStateToProps = function(state) {
  const { page, routing: { location: { pathname: route } } } = state;
  const pages = page.get('items').toJS();

  console.log('PageContainer map state', page);

  return {
    location,
    pages,
    currentPage: _.find(pages || [], [
      'fields.route',
      //normalizePathname(route),
      route,
    ]),
    isFetching: page.getIn(['_metadata', 'isFetching'], false),
  };
};

/**
 * mapDispatchToProps - Description
 *
 * @param {type} dispatch Description
 *
 * @return {type} Description
 */
const mapDispatchToProps = function(dispatch) {
  return {
    getPage: function(route) {
      dispatch(getPage(route));
    },
  };
};

/**
 *
 */
export default connect(mapStateToProps, mapDispatchToProps)(Page);
