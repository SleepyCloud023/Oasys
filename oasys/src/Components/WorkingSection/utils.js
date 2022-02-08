import MockData from '../../MockData/menu_1.json';

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_MOUSEMODE':
      return { ...state, mouseMode: action.nextMode };
    case 'INIT_STATE':
      return { ...state, ...action.initState };
    case 'ADD_OBJECT':
      const nextLength = state.objectListLength + 1;
      const new_object = {
        ObjectId: nextLength,
        ClassName: [],
        Bbox: action.newPoint,
        Extra: [
          {
            text: '',
          },
        ],
      };
      return {
        ...state,
        objectListLength: nextLength,
        objectList: [...state.objectList, new_object],
      };
    default:
      throw new Error('undefined action type: WorkingSection/reducer.js');
  }
}

export function dummyFetchFileInfo() {
  const { ObjectList, ClassList, TagList } = MockData;
  return {
    imgUrl: 'img/menu_1.png',
    mouseMode: 'MOVE',
    objectList: ObjectList,
    classList: ClassList,
    tagList: TagList,
    objectListLength: ObjectList.length,
  };
}

export default reducer;
