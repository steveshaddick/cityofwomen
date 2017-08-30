import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import page from './reducers/page';
/*import tours from './reducers/tours';
import menus from './reducers/menus';
import modals from './reducers/modals';
import contact from './reducers/contact';
import breadcrumbs from './reducers/breadcrumbs';*/

export default combineReducers({
  /*menus,
  tours,*/
  page,
  /*modals,
  contact,
  breadcrumbs,*/
  routing: routerReducer,
});
