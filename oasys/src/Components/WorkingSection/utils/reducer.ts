import { ACTION, BoxObject, WorkState } from '../types';

function reducer(state: WorkState, action: ACTION): WorkState {
  switch (action.type) {
    case 'CHANGE_MOUSEMODE':
      return { ...state, mouseMode: action.nextMode };
    case 'INIT_STATE':
      return { ...state, ...action.initState };
    case 'ADD_OBJECT':
      const nextId = state.box_object_list.length;
      const new_object: BoxObject = {
        id: nextId,
        category: [],
        bounding_box: action.newPoint,
        extra: [
          // TODO: 기존 파일로부터 default extra key set 판단하고 참조
          {
            key: 'text',
            value: '',
          },
        ],
      };
      return {
        ...state,
        box_object_list: [...state.box_object_list, new_object],
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.newCategory],
      };
    case 'ADD_TAG':
      return { ...state, tag_list: [...state.tag_list, action.newTag] };
    case 'UPDATE_SELECTED':
      return { ...state, selectedBoxObjectList: action.newSelected };

    default:
      throw new Error('undefined action type: WorkingSection/utils/reducer.ts');
  }
}

export default reducer;
