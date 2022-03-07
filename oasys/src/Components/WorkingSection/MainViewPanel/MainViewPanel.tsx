import React, { useState, useRef, useContext, useReducer } from 'react';
import styled, { css } from 'styled-components';
import Button from '@mui/material/Button';
import { WorkStore } from '../WorkingSection';
import { BoxObject, PointXY } from '../types';
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
  const [workState] = notNullStore;
  const { imageURL, box_object_list } = workState;

  const boxList = box_object_list.map((content, index) => {
    const { bounding_box, ...rest } = content;
    return bounding_box;
  });

  const ZoomButton = ({ type }: { type: 'in' | 'out' }) => (
    <Button
      variant="outlined"
      onClick={() => {
        canvasDispatch({
          type: 'CANVAS_IMAGEZOOM',
          flag: type,
        });
      }}
    >
      {type == 'in' ? '+' : '-'}
    </Button>
  );

  return (
    <StyledMainView areaPercent={areaPercent}>
      <MainViewUtil>
        <ZoomButton type="in" />
        <div style={{ marginLeft: 7, marginRight: 7 }}>
          {canvasState.imageZoomOut * 100}%
        </div>
        <ZoomButton type="out" />
      </MainViewUtil>

      <MainViewSvg
        onContextMenu={(e: React.MouseEvent<SVGSVGElement>) => {
          e.preventDefault();
        }}
        onMouseDown={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (e.nativeEvent.which == 3) {
            canvasDispatch({
              type: 'CANVAS_IMAGEDRAG',
              flag: 'down',
              offsetX: e.nativeEvent.offsetX,
              offsetY: e.nativeEvent.offsetY,
            });
          }
        }}
        onMouseMove={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (e.nativeEvent.which == 3 && canvasState.imgDragEvent['on']) {
            canvasDispatch({
              type: 'CANVAS_IMAGEDRAG',
              flag: 'move',
              offsetX: e.nativeEvent.offsetX,
              offsetY: e.nativeEvent.offsetY,
            });
          }
        }}
        onMouseUp={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (e.nativeEvent.which == 3) {
            canvasDispatch({
              type: 'CANVAS_IMAGEDRAG',
              flag: 'up',
              offsetX: e.nativeEvent.offsetX,
              offsetY: e.nativeEvent.offsetY,
            });
          }
        }}
        onWheel={(e: React.WheelEvent<SVGSVGElement>) => {
          canvasDispatch({
            type: 'CANVAS_IMAGEZOOMWHEEL',
            flag: e.deltaY < 0 ? 'in' : 'out',
          });
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
