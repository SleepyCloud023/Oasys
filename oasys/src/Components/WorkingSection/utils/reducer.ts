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
        category_list: [...state.category_list, action.newCategory],
      };
    case 'ADD_TAG':
      return { ...state, tag_list: [...state.tag_list, action.newTag] };
    case 'UPDATE_SELECTED':
      if (typeof action.newSelected === 'string') {
        const { newSelected } = action;
        const isCategory = state.category_list.indexOf(newSelected) > -1;
        const selectedBoxSet = isCategory
          ? new Set<number>(
              state.box_object_list
                .filter((boxObject) => {
                  return boxObject.category.indexOf(newSelected) !== -1;
                })
                .map((boxObject) => boxObject.id),
            )
          : new Set<number>();
        return { ...state, selectedBoxList: selectedBoxSet };
      } else {
        return { ...state, selectedBoxList: action.newSelected };
      }

    default:
      throw new Error('undefined action type: WorkingSection/utils/reducer.ts');
  }
}

export default reducer;
