import { ACTION, BoxObject, WorkState } from '../types';

function reducer(state: WorkState, action: ACTION): WorkState {
  switch (action.type) {
    case 'CHANGE_MOUSEMODE':
      return { ...state, mouseMode: action.nextMode };

    case 'INIT_STATE':
      return { ...state, ...action.initState };

    case 'ADD_OBJECT':
      const new_object: BoxObject = {
        id: action.nextId,
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

    case 'DELETE_OBJECT':
      const selectedBoxList = state.selectedBoxList;
      const new_boxt_object_list = state.box_object_list.filter(
        (object) => !selectedBoxList.has(object.id),
      );
      return {
        ...state,
        box_object_list: new_boxt_object_list,
      };

    case 'ADD_CATEGORY':
      return {
        ...state,
        category_list: [...state.category_list, action.newCategory],
      };

    case 'DELETE_CATEGORY':
      return {
        ...state,
        category_list: state.category_list.filter(
          (category) => category !== action.targetCategory,
        ),
      };

    case 'ADD_TAG':
      return { ...state, tag_list: [...state.tag_list, action.newTag] };

    case 'DELETE_TAG':
      return {
        ...state,
        tag_list: state.tag_list.filter((tag) => tag !== action.targetTag),
      };

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

    case 'EDIT_SELECTED':
      const newBoxObjectList = state.box_object_list.map(
        (boxObject: BoxObject) => {
          const newCategory = action.isAppend
            ? [...boxObject.category, action.newCategory]
            : [action.newCategory];

          return {
            ...boxObject,
            category: state.selectedBoxList.has(boxObject.id)
              ? newCategory
              : boxObject.category,
          };
        },
      );
      return { ...state, box_object_list: newBoxObjectList };

    default:
      throw new Error('undefined action type: WorkingSection/utils/reducer.ts');
  }
}

export default reducer;
