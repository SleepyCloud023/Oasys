import React, { useRef, useContext } from 'react';
import { WorkStore } from '../WorkingSection';
import { BoundingBox, Point } from '../types';
import { CanvasState } from './types/canvasStore';
import { PointToString } from './utils/mainViewUtil';
import { onMouseMove, onMouseDown, onMouseUp } from './utils/eventLogic';
import Box from './Box';

type PropsImageCanvse = {
  boxes: Array<BoundingBox>;
  imageURL: string;
  canvasState: CanvasState;
};

function ImageCanvas({ boxes, imageURL, canvasState }: PropsImageCanvse) {
  const { imagePoint, imageZoomOut, imgDragEvent } = canvasState;

  const imageCanvas = useRef<SVGSVGElement>(null);
  const cBox = useRef<SVGPolygonElement>(null);
  const cBoxPoint = useRef<BoundingBox>([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  const cBoxMode = useRef('onMouseUp');
  const imageCanvasRef = { imageCanvas, cBox, cBoxPoint, cBoxMode };

  const notNullStore = useContext(WorkStore);
  if (notNullStore === null) return null;
  const [workState, workDispatch] = notNullStore;

  const boxElements = boxes.map((objects, index) => {
    const points_ = PointToString(objects);

    return <Box points={points_} key={`customId${index}`} />;
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
        onMouseDown={(e) => {
          if (workState.mouseMode == 'BOX') {
            onMouseDown(e, imageCanvasRef, imageZoomOut);
          }
        }}
        onMouseMove={(e) => {
          if (workState.mouseMode == 'BOX') {
            onMouseMove(e, imageCanvasRef, imageZoomOut);
          }
        }}
        onMouseUp={(e) => {
          if (workState.mouseMode == 'BOX') {
            onMouseUp(e, imageCanvasRef, imageZoomOut, workDispatch);
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
