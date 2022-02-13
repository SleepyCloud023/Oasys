import _ from 'lodash';
import { ACTION } from '../../types';
import { PointToString } from './mainViewUtil';
import { BoundingBox } from '../../types';

export const onMouseDown = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: any,
  imageZoomOut: number,
) => {
  const { imageCanvas, cBox, cBoxPoint, cBoxMode } = imageCanvasRef;

  if (imageCanvas.current === null) {
    return null;
  }
  const offsetX =
    (e.nativeEvent.offsetX - imageCanvas.current.x.baseVal.value) *
    (1 / imageZoomOut);
  const offsetY =
    (e.nativeEvent.offsetY - imageCanvas.current.y.baseVal.value) *
    (1 / imageZoomOut);

  var step;
  for (step = 0; step < 4; step++) {
    cBoxPoint.current[step][0] = offsetX;
    cBoxPoint.current[step][1] = offsetY;
  }

  if (cBox.current === null || cBox.current === undefined) {
    return null;
  }

  cBox.current.setAttribute('points', PointToString(cBoxPoint.current));
  cBox.current.setAttribute('stroke-width', '2');

  cBoxMode.current = 'onMouseDown';
};

export const onMouseMove = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: any,
  imageZoomOut: number,
) => {
  const { imageCanvas, cBox, cBoxPoint, cBoxMode } = imageCanvasRef;

  if (cBoxMode.current == 'onMouseDown') {
    if (imageCanvas.current === null || imageCanvas.current === undefined) {
      return null;
    }
    const offsetX =
      (e.nativeEvent.offsetX - imageCanvas.current.x.baseVal.value) *
      (1 / imageZoomOut);
    const offsetY =
      (e.nativeEvent.offsetY - imageCanvas.current.y.baseVal.value) *
      (1 / imageZoomOut);

    cBoxPoint.current[2][0] = offsetX;
    cBoxPoint.current[2][1] = offsetY;
    cBoxPoint.current[3][0] = offsetX;
    cBoxPoint.current[1][1] = offsetY;

    if (cBox.current === null || cBox.current === undefined) {
      return null;
    }
    cBox.current.setAttribute('points', PointToString(cBoxPoint.current));
  }
};

export const onMouseUp = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: any,
  imageZoomOut: number,
  workDispatch: React.Dispatch<ACTION>,
) => {
  const { imageCanvas, cBox, cBoxPoint, cBoxMode } = imageCanvasRef;

  if (imageCanvas.current === null || imageCanvas.current === undefined) {
    return null;
  }
  const offsetX =
    (e.nativeEvent.offsetX - imageCanvas.current.x.baseVal.value) *
    (1 / imageZoomOut);
  const offsetY =
    (e.nativeEvent.offsetY - imageCanvas.current.y.baseVal.value) *
    (1 / imageZoomOut);

  cBoxPoint.current[2][0] = offsetX;
  cBoxPoint.current[2][1] = offsetY;
  cBoxPoint.current[3][0] = offsetX;
  cBoxPoint.current[1][1] = offsetY;

  if (cBox.current === null || cBox.current === undefined) {
    return null;
  }
  cBox.current.setAttribute('stroke-width', '0');

  const newPoint = _.cloneDeep(cBoxPoint.current);
  onAdd(newPoint, workDispatch);
  cBoxMode.current = 'onMouseUp';
};

export const onAdd = (
  newPoint: BoundingBox,
  workDispatch: React.Dispatch<ACTION>,
) => {
  workDispatch({
    type: 'ADD_OBJECT',
    newPoint,
  });
};
