import * as types from '../actions/actionTypes';

export default function authorReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return [...state, ...action.authors];
    default:
      return state;
  }
}
