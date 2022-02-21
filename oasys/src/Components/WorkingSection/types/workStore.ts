// export

export type MouseMode = 'MOVE' | 'BOX' | 'POLYGON';

export type PointXY = [number, number];
export type BoundingBox = [lt: PointXY, rt: PointXY, rb: PointXY, lb: PointXY];

// TODO: JSON 파일과 함께 구조 수정
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

export type WorkState = {
  mouseMode: MouseMode;
  statusText: string;
  imageURL: string;
  imageName: string;
  imageSize: string;
  objectListLength: number;
  box_object_list: Array<BoxObject>;
  categories: Array<string>;
  tag_list: Array<string>;
};

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

export type ACTION =
  | ACTION_CHANGE_MOUSEMODE
  | ACTION_INIT_STATE
  | ACTION_ADD_OBJECT;
