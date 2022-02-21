import { PointXY } from '../../types';

export type CanvasState = {
  imagePoint: PointXY;
  imageZoomOut: number;
  imgDragEvent: ImgDragEvent;
};

export type ImgDragEvent = {
  originPoint: [number, number];
  clickPoint: [number, number];
  on: boolean;
};

type ACTION_IMAGEZOOM = {
  type: 'CANVAS_IMAGEZOOM';
  flag: 'in' | 'out';
};
type ACTION_IMAGEDRAG = {
  type: 'CANVAS_IMAGEDRAG';
  flag: 'down' | 'move' | 'up';
  offsetX: number;
  offsetY: number;
};

export type ACTION = ACTION_IMAGEZOOM | ACTION_IMAGEDRAG;
