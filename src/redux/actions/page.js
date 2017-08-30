/**
 * Module Dependencies
 */
import { createActions } from 'redux-actions';

//import { normalizePathname } from 'libs/contentful';

/**
 * Action types
 */
export const { getPageRequest, getPageSuccess, getPageError } = createActions({
  GET_PAGE_REQUEST: [() => null, () => ({ isFetching: true })],
  GET_PAGE_SUCCESS: [response => response, () => ({ isFetching: false })],
  GET_PAGE_ERROR: [error => error, () => ({ isFetching: false })],
});

/**
 * fetchContent - Description
 *
 * @param {type} api  Description
 * @param {type} route Description
 *
 * @return {type} Description
 */
export function fetchContent(api, route) {
  let options = {
    limit: 1,
    content_type: 'contentPage',
    include: 10,
    'fields.route': route,
  };

  return api.getEntries(options);
}

/**
 * getPage - Description
 *
 * @param {string} [route=*] Description
 *
 * @return {type} Description
 */
export function getPage(route = '*') {
  console.log('getting page', route);
  //return function(dispatch, getState, { api }) {
  return function(dispatch) {
    dispatch(getPageRequest());
    //return fetchContent(api, normalizePathname(route))

    return new Promise(resolve => {
      setTimeout(function() {
        resolve({
          items: [
            {
              fields: {
                route: '/',
                template: 'AboutPage',
              },
            },
          ],
        }); // Yay! Everything went well!
      }, 250);
    })
      .then(response => dispatch(getPageSuccess(response)))
      .catch(error => dispatch(getPageError(error)));
  };
}
