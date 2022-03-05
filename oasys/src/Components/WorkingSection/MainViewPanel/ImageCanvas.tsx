import React, { useRef, useContext } from 'react';
import { WorkStore } from '../WorkingSection';
import { BoundingBox, PointXY } from '../types';
import { CanvasState } from './types/canvasStore';
import { PointToString } from './utils/mainViewUtil';
import { boxModeMove, boxModeDown, boxModeUp } from './utils/boxEventLogic';
import { moveModeMove, moveModeDown, moveModeUp} from './utils/moveEventLogic'
import Box from './Box';

type PropsImageCanvas = {
  boxes: Array<BoundingBox>;
  imageURL: string;
  canvasState: CanvasState;
};

function ImageCanvas({ boxes, imageURL, canvasState }: PropsImageCanvas) {
  const { imagePoint, imageZoomOut } = canvasState;

  const testBox = useRef<SVGPolygonElement>(null);

  const imageCanvas = useRef<SVGSVGElement>(null);
  const cBox = useRef<SVGPolygonElement>(null);
  const cBoxPoint = useRef<BoundingBox>([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  const cBoxMode = useRef('onMouseUp');
  const boxesRef = useRef<(SVGPolygonElement|null)[]>([]);
  const imageCanvasRef = { imageCanvas, cBox, cBoxPoint, cBoxMode };

  const notNullStore = useContext(WorkStore);
  if (notNullStore === null) return null;
  const [workState, workDispatch] = notNullStore;
  const [imgWidth, imgHeight] = workState.imageSize
    .split(' ')
    .map((sizeNum) => {
      return parseInt(sizeNum);
    });



  const boxElements = boxes.map((objects, index) => {
    const points_ = PointToString(objects);
    let color_= 'green'

    if (workState.selectedBoxList.has(index)){
      color_='red'
    }

    return <Box key={`customId${index}`} index={index} points={points_} color={color_} boxesRef={boxesRef}/>;
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
          if (e.nativeEvent.which==1){
            if (workState.mouseMode == 'BOX') {
              boxModeDown(e, imageCanvasRef, imageZoomOut);
            }
            else if (workState.mouseMode == 'MOVE'){
              moveModeDown(e, imageCanvasRef, imageZoomOut)
            }
          }
        }}
        onMouseMove={(e) => {
          if (e.nativeEvent.which==1){
            if (workState.mouseMode == 'BOX') {
              boxModeMove(e, imageCanvasRef, imageZoomOut);
            }
            else if (workState.mouseMode == 'MOVE'){
              moveModeMove(e, imageCanvasRef, imageZoomOut)
            }
          }
        }}
        onMouseUp={(e) => {
          if (e.nativeEvent.which==1){
            if (workState.mouseMode == 'BOX') {
              boxModeUp(e, imageCanvasRef, imageZoomOut, workDispatch);
            }
            else if (workState.mouseMode == 'MOVE'){
              moveModeUp(e, imageCanvasRef, canvasState, workDispatch, boxesRef)
            }
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
