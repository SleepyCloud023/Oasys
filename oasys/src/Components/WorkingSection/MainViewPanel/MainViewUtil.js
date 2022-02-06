export function PointToString(point) {
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
