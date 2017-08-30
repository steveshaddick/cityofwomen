import { List, Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { getPageRequest, getPageSuccess, getPageError } from 'actions/page';

const defaultState = Map({
  items: List(),
  _metadata: Map({
    isFetching: false,
  }),
});

export default handleActions(
  {
    [getPageRequest](state, { meta: { isFetching } }) {
      return state.setIn(['_metadata', 'isFetching'], isFetching);
    },
    [getPageSuccess](state, { payload: { items }, meta: { isFetching } }) {
      console.log('getpagesuccess', items);
      return state.set('items', List(items)).mergeDeep({
        _metadata: Map({
          isFetching: isFetching,
          updatedOn: Date.now(),
        }),
      });
    },
    [getPageError](state, { payload, meta: { isFetching } }) {
      return state.mergeDeep({
        error: payload,
        _metadata: state.get('_metadata').set('isFetching', isFetching),
      });
    },
  },
  defaultState
);
