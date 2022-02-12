import React, { useRef, useContext } from 'react';
import _ from 'lodash';
import { PointToString } from './MainViewUtil';
import { WorkStore } from '../WorkingSection';

function ImageCanvas({ boxes, imageURL, imagePoint, imageZoomOut }) {
  const [workState, workDispatch] = useContext(WorkStore);

  const cBox = useRef();
  const cBoxPoint = useRef([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  const cBoxMode = useRef('onMouseUp');
  const imageCanvas = useRef();

  const onAdd = (newPoint) => {
    workDispatch({
      type: 'ADD_OBJECT',
      newPoint: newPoint,
    });
  };

  const onMouseDown = (e) => {
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

    cBox.current.setAttribute('points', PointToString(cBoxPoint.current));
    cBox.current.setAttribute('stroke-width', '2');

    cBoxMode.current = 'onMouseDown';
  };

  const onMouseMove = (e) => {
    if (cBoxMode.current == 'onMouseDown') {
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

      cBox.current.setAttribute('points', PointToString(cBoxPoint.current));
    }
  };

  const onMouseUp = (e) => {
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
    cBox.current.setAttribute('stroke-width', '0');
    const newPoint = _.cloneDeep(cBoxPoint.current);
    onAdd(newPoint);
    cBoxMode.current = 'onMouseUp';
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
    <g>
      <svg
        version="1.1"
        baseProfile="full"
        width={340 * imageZoomOut}
        height={453 * imageZoomOut}
        x={imagePoint[0]}
        y={imagePoint[1]}
        viewBox="0, 0, 340, 453"
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
        ref={imageCanvas}
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
    </g>
  );
}

export default ImageCanvas;
