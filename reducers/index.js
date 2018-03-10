import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions';
import { getOr, identity, merge } from 'lodash/fp'

export const createReducer = (inital, handlers) => (state = inital, action) =>
  getOr(identity, action.type, handlers)(state, action);

const handlers = {
  [RECEIVE_ENTRIES](state, action) {
    return merge(state, action.entries);
  },
  [ADD_ENTRY](state, action) {
    return merge(state, action.entry);
  },
};

export default createReducer({}, handlers);
