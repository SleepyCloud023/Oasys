import React, { useRef } from 'react';
import _ from 'lodash';
import { PointToString } from './MainViewUtil';

function SvgCanvas({ boxes, onAdd }) {
  const cBox = useRef();
  const cBoxPoint = useRef([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  const cBoxMode = useRef('onMouseUp');

  const onMouseDown = (e) => {
    cBox.current.setAttribute('stroke-width', '2');

    var step;
    for (step = 0; step < 4; step++) {
      cBoxPoint.current[step][0] = e.nativeEvent.offsetX;
      cBoxPoint.current[step][1] = e.nativeEvent.offsetY;
    }

    cBox.current.setAttribute('points', PointToString(cBoxPoint.current));
    cBoxMode.current = 'onMouseDown';
  };

  const onMouseMove = (e) => {
    if (cBoxMode.current == 'onMouseDown') {
      cBoxPoint.current[2][0] = e.nativeEvent.offsetX;
      cBoxPoint.current[2][1] = e.nativeEvent.offsetY;
      cBoxPoint.current[3][0] = e.nativeEvent.offsetX;
      cBoxPoint.current[1][1] = e.nativeEvent.offsetY;
      cBox.current.setAttribute('points', PointToString(cBoxPoint.current));
    }
  };

  const onMouseUp = (e) => {
    cBox.current.setAttribute('stroke-width', '0');

    cBoxPoint.current[2][0] = e.nativeEvent.offsetX;
    cBoxPoint.current[2][1] = e.nativeEvent.offsetY;
    cBoxPoint.current[3][0] = e.nativeEvent.offsetX;
    cBoxPoint.current[1][1] = e.nativeEvent.offsetY;

    cBox.current.setAttribute('points', PointToString(cBoxPoint.current));

    const newPoint = _.cloneDeep(cBoxPoint.current);
    cBoxMode.current = 'onMouseUp';

    onAdd(newPoint);
  };

  const boxElements = boxes.map((objects, index) => {
    const points_ = PointToString(objects);

    return (
      <polygon
        points={points_}
        stroke="green"
        fill="green"
        style={{ opacity: 0.5 }}
        strokeWidth="2"
        key={`customId${index}`}
      />
    );
  });

  return (
    <svg
      version="1.1"
      baseProfile="full"
      width="320"
      height="204"
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <image href="img/test_image.jpg" />

      <polygon
        points="100,100, 100,100 100,100 100,100"
        stroke="blue"
        fill="transparent"
        strokeWidth="2"
        ref={cBox}
      ></polygon>

      {boxElements}
    </svg>
  );
}

export default SvgCanvas;
