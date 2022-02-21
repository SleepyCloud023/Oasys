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
        id: nextLength,
        category: [],
        bounding_box: action.newPoint,
        extra: [
          {
            key: 'text',
            value: '',
          },
        ],
      };
      return {
        ...state,
        objectListLength: nextLength,
        box_object_list: [...state.box_object_list, new_object],
      };
    default:
      throw new Error('undefined action type: WorkingSection/utils/reducer.ts');
  }
}

export default reducer;
