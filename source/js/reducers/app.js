import { Map } from 'immutable';

import {
  ADD_NOTE,
  REMOVE_NOTE,
} from 'actions/app';

const defaultState = {
  notes: [],
};

export default function (state = defaultState, action = {}) {
  const { type, data } = action;
  switch (type) {
    case ADD_NOTE:
      data.age = Number(data.age)
      return Object.assign({}, state, {
        notes: state.notes.concat(data),
      });
    default: return state;
  }
}
