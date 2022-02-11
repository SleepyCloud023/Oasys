import React, { useRef, useContext } from 'react';
import _ from 'lodash';
import { PointToString } from './MainViewUtil';
import { WorkStore } from '../WorkingSection';

function ImageCanvas({ boxes, imageURL, imagePoint }) {
  const [workState, workDispatch] = useContext(WorkStore);

  const cBox = useRef();
  const cBoxPoint = useRef([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  const cBoxMode = useRef('onMouseUp');

  const onAdd = (newPoint) => {
    workDispatch({
      type: 'ADD_OBJECT',
      newPoint: newPoint,
    });
  };

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
      width="700"
      height="1000"
      x={imagePoint[0]}
      y={imagePoint[1]}
      onMouseMove={(e) => {
        if (workState.mouseMode == 'BOX') {
          onMouseMove(e);
        }
      }}
      onMouseDown={(e) => {
        if (workState.mouseMode == 'BOX') {
          onMouseDown(e);
        }
      }}
      onMouseUp={(e) => {
        if (workState.mouseMode == 'BOX') {
          onMouseUp(e);
        }
      }}
    >
      {/* TODO: public path to url of API server */}
      <image href={imageURL} />
      <polygon
        points="100,100, 100,100 100,100 100,100"
        stroke="green"
        fill="transparent"
        strokeWidth="2"
        ref={cBox}
      ></polygon>

      {boxElements}
    </svg>
  );
}

export default ImageCanvas;
