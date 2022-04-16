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
