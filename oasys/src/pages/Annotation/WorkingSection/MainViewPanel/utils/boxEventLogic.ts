import _ from 'lodash';
import { ACTION } from '../../types';
import { convertMain2Image, PointToString } from './mainViewUtil';
import { BoundingBox } from '../../types';

export const boxModeDown = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: any,
  imageZoomOut: number,
) => {
  const { imageCanvas, cBox, cPoint, cBoxMode } = imageCanvasRef;

  if (imageCanvas.current === null) {
    return null;
  }
  const [offsetX, offsetY] = convertMain2Image(e, imageZoomOut, imageCanvas);

  var step;
  for (step = 0; step < 4; step++) {
    cPoint.current[step][0] = offsetX;
    cPoint.current[step][1] = offsetY;
  }

  if (cBox.current === null || cBox.current === undefined) {
    return null;
  }
  cBox.current.setAttribute('stroke', '#16c997');
  cBox.current.setAttribute('points', PointToString(cPoint.current));
  cBox.current.setAttribute('stroke-width', '2');

  cBoxMode.current = 'onMouseDown';
};

export const boxModeMove = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: any,
  imageZoomOut: number,
) => {
  const { imageCanvas, cBox, cPoint, cBoxMode } = imageCanvasRef;

  if (cBoxMode.current === 'onMouseDown') {
    if (imageCanvas.current === null || imageCanvas.current === undefined) {
      return null;
    }
    const [offsetX, offsetY] = convertMain2Image(e, imageZoomOut, imageCanvas);

    cPoint.current[2][0] = offsetX;
    cPoint.current[2][1] = offsetY;
    cPoint.current[3][0] = offsetX;
    cPoint.current[1][1] = offsetY;

    if (cBox.current === null || cBox.current === undefined) {
      return null;
    }
    cBox.current.setAttribute('points', PointToString(cPoint.current));
  }
};

export const boxModeUp = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: any,
  imageZoomOut: number,
  nextId: number,
  workDispatch: React.Dispatch<ACTION>,
) => {
  const { imageCanvas, cBox, cPoint, cBoxMode } = imageCanvasRef;

  if (imageCanvas.current === null || imageCanvas.current === undefined) {
    return null;
  }
  const [offsetX, offsetY] = convertMain2Image(e, imageZoomOut, imageCanvas);

  cPoint.current[2][0] = offsetX;
  cPoint.current[2][1] = offsetY;
  cPoint.current[3][0] = offsetX;
  cPoint.current[1][1] = offsetY;

  if (cBox.current === null || cBox.current === undefined) {
    return null;
  }
  cBox.current.setAttribute('stroke-width', '0');

  if (
    cPoint.current[0][0] === cPoint.current[2][0] &&
    cPoint.current[0][0] === cPoint.current[2][0]
  ) {
    return;
  }

  const newPoint = _.cloneDeep(cPoint.current);
  onAdd(newPoint, nextId, workDispatch);
  cBoxMode.current = 'onMouseUp';
};

export const onAdd = (
  newPoint: BoundingBox,
  nextId: number,
  workDispatch: React.Dispatch<ACTION>,
) => {
  workDispatch({
    type: 'ADD_OBJECT',
    newPoint,
    nextId,
  });
};
