import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions';
import { propOr, identity, merge } from 'ramda';

export const createReducer = (inital, handlers) => (state = inital, action) =>
  propOr(identity, action.type, handlers)(state, action);

const handlers = {
  [RECEIVE_ENTRIES](state, action) {
    return merge(state, action.entries);
  },
  [ADD_ENTRY](state, action) {
    return merge(state, action.entry);
  },
};

export default createReducer({}, handlers);
