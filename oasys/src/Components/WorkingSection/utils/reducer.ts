import { ACTION, BoxObject, WorkState } from '../types';

function reducer(state: WorkState, action: ACTION): WorkState {
  switch (action.type) {
    case 'CHANGE_MOUSEMODE':
      return { ...state, mouseMode: action.nextMode };
    case 'INIT_STATE':
      return { ...state, ...action.initState };
    case 'ADD_OBJECT':
      const nextLength = state.objectListLength + 1;
      const new_object: BoxObject = {
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

export default reducer;
