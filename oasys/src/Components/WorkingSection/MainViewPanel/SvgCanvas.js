import React, { useState, useRef } from 'react';

function ArrayToString(point) {
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

function SvgCanvas({ boxes, onAdd }) {
  const cBox = useRef();
  const cBoxPoint = useRef([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  const onMouseDown = (e) => {
    cBox.current.strokeWidth = '3';

    var step;
    for (step = 0; step < 4; step++) {
      cBoxPoint.current[step][0] = e.nativeEvent.offsetX;
      cBoxPoint.current[step][1] = e.nativeEvent.offsetY;
    }

    cBox.current.setAttribute('points', ArrayToString(cBoxPoint.current));
  };

  const onMouseMove = (e) => {
    cBoxPoint.current[2][0] = e.nativeEvent.offsetX;
    cBoxPoint.current[2][1] = e.nativeEvent.offsetX;
    cBoxPoint.current[1][0] = e.nativeEvent.offsetX;
    cBoxPoint.current[3][1] = e.nativeEvent.offsetX;
    cBox.current.setAttribute('points', ArrayToString(cBoxPoint.current));
  };

  const onMouseUp = (e) => {
    cBox.current.strokeWidth = '0';

    cBoxPoint.current[2][0] = e.nativeEvent.offsetX;
    cBoxPoint.current[2][1] = e.nativeEvent.offsetY;
    cBoxPoint.current[3][0] = e.nativeEvent.offsetX;
    cBoxPoint.current[1][1] = e.nativeEvent.offsetY;

    cBox.current.setAttribute('points', ArrayToString(cBoxPoint.current));

    onAdd(cBoxPoint.current);
  };

  const boxElements = boxes.map((objects, index) => {
    const points_ = ArrayToString(objects);

    return (
      <polygon
        points={points_}
        stroke="green"
        fill="transparent"
        strokeWidth="3"
        key={`customId${index}`}
      />
    );
  });
  console.log(boxElements);

  return (
    <svg
      version="1.1"
      baseProfile="full"
      width="320"
      height="204"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <image href="img/test_image.jpg" />

      <polygon
        points="0,0, 0,0 0,0 0,0"
        stroke="green"
        fill="transparent"
        strokeWidth="0"
        ref={cBox}
      ></polygon>

      {boxElements}
    </svg>
  );
}

export default SvgCanvas;
