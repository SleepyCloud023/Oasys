import MockData from '../../MockData/MainView3.json';

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
  const { ObjectList, ClassList, TagList } = MockData;
  return {
    mouseMode: 'MOVE',
    objectList: ObjectList,
    classList: ClassList,
    tagList: TagList,
  };
}

export default reducer;
