export type MouseMode = 'MOVE' | 'BOX' | 'POLYGON';

export type PointXY = [number, number];
export type BoundingBox = [lt: PointXY, rt: PointXY, rb: PointXY, lb: PointXY];

export type ExtraInfoPair = {
  key: string;
  value: string;
};

export type BoxObject = {
  id: number;
  bounding_box: BoundingBox;
  category: Array<string>;
  extra: Array<ExtraInfoPair>;
};

export type Annotation = {
  box_object_list: Array<BoxObject>;
  category_list: Array<string>;
  tag_list: Array<string>;
};

export type ImageInfo = {
  imageName: string;
  imageURL: string;
  imageSize: string;
};

export type WorkState = {
  id: number;
  mouseMode: MouseMode;
  statusText: string;
  selectedBoxList: Set<number>;
} & Annotation &
  ImageInfo;

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
type ACTION_ADD_TAG = {
  type: 'ADD_TAG';
  newTag: string;
};
type ACTION_UPDATE_SELECTED = {
  type: 'UPDATE_SELECTED';
  newSelected: Set<number> | string;
};

type ACTION_EDIT_SELECTED = {
  type: 'EDIT_SELECTED';
  newCategory: Array<string>;
};

export type ACTION =
  | ACTION_CHANGE_MOUSEMODE
  | ACTION_INIT_STATE
  | ACTION_ADD_OBJECT
  | ACTION_ADD_CATEGORY
  | ACTION_ADD_TAG
  | ACTION_UPDATE_SELECTED
  | ACTION_DELETE_OBJECT
  | ACTION_EDIT_SELECTED;
