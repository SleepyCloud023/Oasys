function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_MOUSEMODE':
      const nextState = { ...state, mouseMode: action.nextMode };
      return nextState;

    default:
      throw new Error('undefined action type: WorkingSection/reducer.js');
  }
}

export function dummyFetchFileInfo() {
  return { mouseMode: 'MOVE' };
}

export default reducer;
