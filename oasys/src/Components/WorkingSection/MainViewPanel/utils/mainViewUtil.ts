import { BoundingBox } from '../../types';

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

export function convertSVGPoint(
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageZoomOut: number,
  imageCanvas: React.RefObject<SVGSVGElement>,
) {
  if (imageCanvas.current === null) {
    return [0, 0];
  }

  const offsetX =
    (e.nativeEvent.offsetX - imageCanvas.current.x.baseVal.value) *
    (1 / imageZoomOut);
  const offsetY =
    (e.nativeEvent.offsetY - imageCanvas.current.y.baseVal.value) *
    (1 / imageZoomOut);

  return [offsetX, offsetY];
}
