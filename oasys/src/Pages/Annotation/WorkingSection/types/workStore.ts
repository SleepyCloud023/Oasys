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
  mouseMode: MouseMode;
  statusText: string;
  selectedBoxList: Set<number>;
} & Annotation &
  ImageInfo;

// 아래 두가지는 다르다.
// reducer에서 Union type에 대한 Narrowing(추론)을 가능하게 한다.
// type ACTION_CHANGE_MOUSEMODE = {
//   type: string;
//   nextMode: string;
// };
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

export type ACTION =
  | ACTION_CHANGE_MOUSEMODE
  | ACTION_INIT_STATE
  | ACTION_ADD_OBJECT
  | ACTION_ADD_CATEGORY
  | ACTION_ADD_TAG
  | ACTION_UPDATE_SELECTED;
