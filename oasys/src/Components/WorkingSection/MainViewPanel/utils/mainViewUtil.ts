import { BoundingBox, PointXY } from '../../types';

export function PointToString(point: BoundingBox) {
  const string_point =
    point[0][0] +
    ' ' +
    point[0][1] +
    ', ' +
    point[1][0] +
    ' ' +
    point[1][1] +
    ', ' +
    point[2][0] +
    ' ' +
    point[2][1] +
    ', ' +
    point[3][0] +
    ' ' +
    point[3][1];
  return string_point;
}

export function convertMain2Image(
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageZoomOut: number,
  imageCanvas: React.RefObject<SVGSVGElement>,
) {
  if (imageCanvas.current === null) {
    return [0, 0];
  }

  const eventOffset: [number, number] = [
    e.nativeEvent.offsetX,
    e.nativeEvent.offsetY,
  ];
  const baseVal: [number, number] = [
    imageCanvas.current.x.baseVal.value,
    imageCanvas.current.y.baseVal.value,
  ];

  const [offsetX, offsetY] = scaleMain2Image(
    translateMain2Image(eventOffset, baseVal),
    imageZoomOut,
  );

  return [offsetX, offsetY];
}

export function createSVGRect(
  cPoint: BoundingBox,
  imagePoint: PointXY,
  imageZoomOut: number,
  imageCanvas: React.RefObject<SVGSVGElement>,
) {
  if (imageCanvas.current === null) {
    return null;
  }
  var rect = imageCanvas.current.createSVGRect();

  const topleft: [number, number] = [
    Math.min(cPoint[0][0], cPoint[2][0]),
    Math.min(cPoint[0][1], cPoint[2][1]),
  ];
  const bottomRight: [number, number] = [
    Math.max(cPoint[0][0], cPoint[2][0]),
    Math.max(cPoint[0][1], cPoint[2][1]),
  ];

  const [x, y] = translateMain2Image(
    scaleMain2Image(topleft, imageZoomOut, true),
    imagePoint,
    true,
  );
  const [width, height] = scaleMain2Image(
    [bottomRight[0] - topleft[0], bottomRight[1] - topleft[1]],
    imageZoomOut,
    true,
  );

  rect.x = x;
  rect.y = y;
  rect.width = width;
  rect.height = height;

  return rect;
}

function translateMain2Image(
  inputXY: [X: number, Y: number],
  translateFactor: [X: number, Y: number],
  reverse: boolean = false,
): [number, number] {
  const coef = reverse ? -1 : 1;
  const X = inputXY[0] - coef * translateFactor[0];
  const Y = inputXY[1] - coef * translateFactor[1];
  return [X, Y];
}

function scaleMain2Image(
  inputXY: [X: number, Y: number],
  scaleFactor: number,
  reverse: boolean = false,
): [number, number] {
  const coef = reverse ? scaleFactor : 1 / scaleFactor;
  const X = inputXY[0] * coef;
  const Y = inputXY[1] * coef;

  return [X, Y];
}
