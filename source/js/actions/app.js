
export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const SORT_NOTES = 'SORT_NOTES';

export const addNote = data => {
  return {
    type: ADD_NOTE,
    data,
  };
}

export const removeNote = note => {
  return {
    type: REMOVE_NOTE,
    note,
  };
}

export const sortNotes = (field, direction) => {
  return {
    type: SORT_NOTES,
    field,
    direction,
  };
}

