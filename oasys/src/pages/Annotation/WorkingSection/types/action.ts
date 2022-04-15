import { BoundingBox, MouseMode, WorkState } from './workStore';

type ACTION_CHANGE_MOUSEMODE = {
  type: 'CHANGE_MOUSEMODE';
  nextMode: MouseMode;
};

type ACTION_INIT_STATE = {
  type: 'INIT_STATE';
  initState: WorkState;
};

type ACTION_ADD_OBJECT = {
  type: 'ADD_OBJECT';
  newPoint: BoundingBox;
  nextId: number;
};

type ACTION_DELETE_OBJECT = {
  type: 'DELETE_OBJECT';
};

type ACTION_ADD_CATEGORY = {
  type: 'ADD_CATEGORY';
  newCategory: string;
};

type ACTION_DELETE_CATEGORY = {
  type: 'DELETE_CATEGORY';
  targetCategory: string;
};

type ACTION_ADD_TAG = {
  type: 'ADD_TAG';
  newTag: string;
};

type ACTION_DELETE_TAG = {
  type: 'DELETE_TAG';
  targetTag: string;
};

type ACTION_UPDATE_SELECTED = {
  type: 'UPDATE_SELECTED';
  newSelected: Set<number> | string;
};

type ACTION_EDIT_SELECTED = {
  type: 'EDIT_SELECTED';
  newCategory: string;
  isAppend: boolean;
};

export type ACTION =
  | ACTION_CHANGE_MOUSEMODE
  | ACTION_INIT_STATE
  | ACTION_ADD_OBJECT
  | ACTION_DELETE_OBJECT
  | ACTION_ADD_CATEGORY
  | ACTION_DELETE_CATEGORY
  | ACTION_ADD_TAG
  | ACTION_DELETE_TAG
  | ACTION_UPDATE_SELECTED
  | ACTION_EDIT_SELECTED;
