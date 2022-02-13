import React, { useState, useRef, useContext, useReducer } from 'react';
import styled, { css } from 'styled-components';
import Button from '@mui/material/Button';
import { WorkStore } from '../WorkingSection';
import { BoxObject, Point } from '../types';
import { CanvasState } from './types/canvasStore';
import reducer from './utils/reducer';
import ImageCanvas from './ImageCanvas';

type PropsMainViewPanel = { readonly areaPercent?: number };

const StyledMainView = styled.div<PropsMainViewPanel>`
  color: white;
  font: bold;
  font-size: 1.25rem;
  /* 배치 */
  ${({ areaPercent }) => {
    if (!areaPercent) {
    } else {
      return `
        flex: ${areaPercent} 0 0;
      `;
    }
  }}
  flex-flow: column;
  display: flex;
  background-color: #1c1d1f;
`;

const MainViewUtil = styled.div`
  /* 색상 */
  display: flex;
  color: white;
  font: bold;
  font-size: 1.25rem;
`;

const MainViewSvg = styled.svg`
  flex: 1 0 0;
`;

function objectExtractor(element: BoxObject, index: number) {
  const { Bbox, ...rest } = element;
  return Bbox;
}

const baseImageState: CanvasState = {
  imagePoint: [50, 50],
  imageZoomOut: 1,
  imgDragEvent: {
    originPoint: [50, 50],
    clickPoint: [0, 0],
    on: false,
  },
};

function MainViewCanvas({ areaPercent }: PropsMainViewPanel) {
  const [canvasState, canvasDispatch] = useReducer(reducer, baseImageState);

  const notNullStore = useContext(WorkStore);
  if (notNullStore === null) return null;
  const [workState, workDispatch] = notNullStore;
  const { imageURL, mouseMode, objectList, classList, tagList } = workState;

  const boxList = objectList.map((content, index) => {
    const objects = objectExtractor(content, index);
    return objects;
  });

  return (
    <StyledMainView areaPercent={areaPercent}>
      <MainViewUtil>
        <Button
          variant="outlined"
          onClick={() => {
            canvasDispatch({
              type: 'CANVAS_IMAGEZOOMOUT',
              flag: 'zoom',
            });
          }}
        >
          +
        </Button>
        <div style={{ marginLeft: 7, marginRight: 7 }}>
          {canvasState.imageZoomOut * 100}%
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            canvasDispatch({
              type: 'CANVAS_IMAGEZOOMOUT',
              flag: 'out',
            });
          }}
        >
          -
        </Button>
      </MainViewUtil>

      <MainViewSvg
        onMouseDown={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (workState.mouseMode == 'MOVE') {
            canvasDispatch({
              type: 'CANVAS_IMAGEDRAG',
              flag: 'down',
              offsetX: e.nativeEvent.offsetX,
              offsetY: e.nativeEvent.offsetY,
            });
          }
        }}
        onMouseMove={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (workState.mouseMode == 'MOVE' && canvasState.imgDragEvent['on']) {
            canvasDispatch({
              type: 'CANVAS_IMAGEDRAG',
              flag: 'move',
              offsetX: e.nativeEvent.offsetX,
              offsetY: e.nativeEvent.offsetY,
            });
          }
        }}
        onMouseUp={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (workState.mouseMode == 'MOVE') {
            canvasDispatch({
              type: 'CANVAS_IMAGEDRAG',
              flag: 'up',
              offsetX: e.nativeEvent.offsetX,
              offsetY: e.nativeEvent.offsetY,
            });
          }
        }}
      >
        <ImageCanvas
          boxes={boxList}
          imageURL={imageURL}
          canvasState={canvasState}
        />
      </MainViewSvg>
    </StyledMainView>
  );
}

export default MainViewCanvas;
