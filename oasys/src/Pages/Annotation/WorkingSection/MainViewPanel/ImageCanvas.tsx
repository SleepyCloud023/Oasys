import React, { useRef, useContext } from 'react';
import { WorkStore } from '../WorkingSection';
import { BoundingBox, PointXY } from '../types';
import { useWorkStore } from '../utils';
import { CanvasState } from './types/canvasStore';
import { PointToString } from './utils/mainViewUtil';
import { boxModeMove, boxModeDown, boxModeUp } from './utils/boxEventLogic';
import {
  moveModeMove,
  moveModeDown,
  moveModeUp,
  moveModeClick,
} from './utils/moveEventLogic';
import Box from './Box';
import { polygonModeClick } from './utils/polygonEventLogic';

type PropsImageCanvas = {
  boxes: Array<{ id: number; bounding_box: BoundingBox }>;
  imageURL: string;
  canvasState: CanvasState;
};

function ImageCanvas({ boxes, imageURL, canvasState }: PropsImageCanvas) {
  const { imagePoint, imageZoomOut } = canvasState;

  const imageCanvas = useRef<SVGSVGElement>(null);
  const boxesRef = useRef<(SVGPolygonElement | null)[]>([]);

  const cBox = useRef<SVGPolygonElement>(null);
  const cBoxMode = useRef('onMouseUp');
  const cPointRef = useRef<(SVGCircleElement | null)[]>([]);
  const cPointState = useRef(0);

  const cPoint = useRef<BoundingBox>([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  const imageCanvasRef = {
    imageCanvas,
    cBox,
    cBoxMode,
    cPointRef,
    cPointState,
    cPoint,
  };

  const [workState, workDispatch] = useWorkStore();
  const [imgWidth, imgHeight] = workState.imageSize
    .split(' ')
    .map((sizeNum) => {
      return parseInt(sizeNum);
    });

  const boxElements = boxes.map((objects) => {
    const points_ = PointToString(objects.bounding_box);
    let color_ = 'green';
    if (workState.selectedBoxList.has(objects.id)) {
      color_ = 'red';
    }
    return (
      <Box
        key={`customId${objects.id}`}
        index={objects.id}
        points={points_}
        color={color_}
        boxesRef={boxesRef}
      />
    );
  });
  const cPointElement = [0, 0, 0, 0].map((_, index) => {
    return (
      <circle
        key={`circle${index}`}
        cx="0"
        cy="0"
        r="0"
        fill="#16c997"
        ref={(el) => (cPointRef.current[index] = el)}
      />
    );
  });

  return (
    <g>
      <svg
        version="1.1"
        baseProfile="full"
        width={imgWidth * imageZoomOut}
        height={imgHeight * imageZoomOut}
        x={imagePoint[0]}
        y={imagePoint[1]}
        viewBox={'0, 0, ' + imgWidth + ', ' + imgHeight}
        onMouseDown={(e) => {
          if (e.nativeEvent.which == 1) {
            if (workState.mouseMode == 'BOX') {
              boxModeDown(e, imageCanvasRef, imageZoomOut);
            } else if (workState.mouseMode == 'MOVE') {
              moveModeDown(e, imageCanvasRef, imageZoomOut);
            }
          }
        }}
        onMouseMove={(e) => {
          if (e.nativeEvent.which == 1) {
            if (workState.mouseMode == 'BOX') {
              boxModeMove(e, imageCanvasRef, imageZoomOut);
            } else if (workState.mouseMode == 'MOVE') {
              moveModeMove(e, imageCanvasRef, imageZoomOut);
            }
          }
        }}
        onMouseUp={(e) => {
          if (e.nativeEvent.which == 1) {
            if (workState.mouseMode == 'BOX') {
              boxModeUp(e, imageCanvasRef, imageZoomOut, workDispatch);
            } else if (workState.mouseMode == 'MOVE') {
              moveModeUp(
                e,
                imageCanvasRef,
                canvasState,
                workDispatch,
                boxesRef,
              );
            }
          }
        }}
        onClick={(e) => {
          if (workState.mouseMode == 'POLYGON') {
            polygonModeClick(e, imageCanvasRef, imageZoomOut, workDispatch);
          }
        }}
        ref={imageCanvas}
      >
        {/* TODO: public path to url of API server */}
        <image
          href={imageURL}
          onClick={(e) => {
            if (workState.mouseMode == 'MOVE') {
              moveModeClick(e, workDispatch);
            }
          }}
        />
        <polygon
          points="100,100, 100,100 100,100 100,100"
          fill="transparent"
          strokeWidth="2"
          ref={cBox}
        ></polygon>
        {cPointElement}

        {boxElements}
      </svg>
    </g>
  );
}

export default ImageCanvas;
