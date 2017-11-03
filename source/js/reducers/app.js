import { Map } from 'immutable';

import {
  ADD_NOTE,
  REMOVE_NOTE,
  SORT_NOTES,
} from 'actions/app';

const initialState = Map({
  notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [],
  sortedNotes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [],
});

const actionsMap = {
  [ADD_NOTE]: (state, action) => {
    const payload = action.data;
    payload.age = Number(payload.age);
    return state.merge(Map({
      notes: state.get('notes').concat(payload),
      sortedNotes: state.get('sortedNotes').concat(payload),
    }));
  },
  [REMOVE_NOTE]: (state, action) => {
    const indexInNotes = state.get('notes').findIndex(item => {
      return item.phone === action.note.phone;
    });
    const indexInSortedNotes = state.get('sortedNotes').findIndex(item => {
      return item.phone === action.note.phone;
    });
    return state.merge(Map({
      notes: [
        ...state.get('notes').slice(0, indexInNotes),
        ...state.get('notes').slice(indexInNotes + 1),
      ],
      sortedNotes: [
        ...state.get('sortedNotes').slice(0, indexInSortedNotes),
        ...state.get('sortedNotes').slice(indexInSortedNotes + 1),
      ],
    }));
  },
  [SORT_NOTES]: (state, action) => {
    let result = [];
    if (action.direction === 1) {
      result = result.concat(state.get('notes')).sort((a, b) => {
        return a[action.field] < b[action.field];
      });
    } else {
      result = result.concat(state.get('notes')).sort((a, b) => {
        return a[action.field] > b[action.field];
      });
    }
    return state.merge(Map({
      sortedNotes: result,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
