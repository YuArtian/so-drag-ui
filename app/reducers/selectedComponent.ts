export const defaultState = {
  id: '',
  name: '',
  selected: false,
  type: '',
};

export function reducer(state, action) {
  switch (action.type) {
    case 'REPLACE':
      return { ...state };
    default:
      throw new Error();
  }
}
