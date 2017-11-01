
export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

export const addNote = data => {
  return {
    type: ADD_NOTE,
    data,
  };
}

export const removeNote = index => {
  return {
    type: REMOVE_NOTE,
    index,
  };
}

