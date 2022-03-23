import { useContext } from 'react';
import _ from 'lodash';
import { ACTION } from '../../types';
import {
  convertMain2Image,
  createSVGRect,
  PointToString,
} from './mainViewUtil';
import { BoundingBox } from '../../types';
import { CanvasState } from '../types/canvasStore';
import { Checkbox } from '@mui/material';

type ParamImageCanvasRef = {
  imageCanvas: React.RefObject<SVGSVGElement>;
  cBox: React.RefObject<SVGPolygonElement>;
  cPoint: React.MutableRefObject<BoundingBox>;
  cBoxMode: React.MutableRefObject<string>;
};

export const moveModeDown = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: ParamImageCanvasRef,
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
  cBox.current.setAttribute('stroke', '#c7341a');
  cBox.current.setAttribute('points', PointToString(cPoint.current));
  cBox.current.setAttribute('stroke-width', '1');

  cBoxMode.current = 'onMouseDown';
};

export const moveModeMove = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: ParamImageCanvasRef,
  imageZoomOut: number,
) => {
  const { imageCanvas, cBox, cPoint, cBoxMode } = imageCanvasRef;

  if (cBoxMode.current == 'onMouseDown') {
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

export const moveModeUp = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: ParamImageCanvasRef,
  canvasState: CanvasState,
  workDispatch: React.Dispatch<ACTION>,
  boxesRef: React.MutableRefObject<(SVGPolygonElement | null)[]>,
) => {
  const { imageCanvas, cBox, cPoint: cPoint, cBoxMode } = imageCanvasRef;
  const { imagePoint, imageZoomOut } = canvasState;

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
  //cBox.current.setAttribute('stroke-width', '0');\
  cBox.current.setAttribute('points', PointToString(cPoint.current));

  cBoxMode.current = 'onMouseUp';
  cBox.current.setAttribute('stroke-width', '0');

  var rect = createSVGRect(
    cPoint.current,
    imagePoint,
    imageZoomOut,
    imageCanvas,
  );

  const newSelected = new Set<number>();

  boxesRef.current.forEach((box, index) => {
    if (box == null || rect == null) return;
    const check = imageCanvas.current?.checkIntersection(box, rect);

    if (check == true) newSelected.add(index);
  });

  workDispatch({
    type: 'UPDATE_SELECTED',
    newSelected: newSelected,
  });

  // const xmlns = "http://www.w3.org/2000/svg";
  // var polygon = document.createElementNS(xmlns, "polygon");
  // polygon.setAttribute("points","100,100 200,100 200,200 100,200");
  // polygon.setAttribute("stroke","blue");
  // polygon.setAttribute("fill","transparent");
  // polygon.setAttribute("strokeWidth","2");
  //imageCanvas.current.appendChild(polygon);

  //if (boxesRef.current[0]==null) return;
  //const check = imageCanvas.current?.checkIntersection(boxesRef.current[0], rect);
  //console.log('intersection : ', check);
};
