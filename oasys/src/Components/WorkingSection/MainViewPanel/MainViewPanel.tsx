import React, { useState, useRef, useContext, SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import { WorkStore } from '../WorkingSection';
import ImageCanvas from './ImageCanvas';
import Button from '@mui/material/Button';
import { BoxObject, Point } from '../types';

type PropsMainViewPanel = { readonly areaPercent?: number };

const MainCanvas = styled.div<PropsMainViewPanel>`
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

function objectExtractor(element: BoxObject, index: number) {
  const { Bbox, ...rest } = element;
  return Bbox;
}

const canvasStyle = {
  flex: '1 0 0',
};

function MainViewCanvas({ areaPercent }: PropsMainViewPanel) {
  const [imagePoint, setImagePoint] = useState<Point>([50, 50]);
  const [imageZoomOut, setImageZoomOut] = useState(1);
  const onclickState = useRef({
    originPoint: [50, 50],
    clickPoint: [0, 0],
    on: false,
  });

  const notNullStore = useContext(WorkStore);
  if (notNullStore === null) return null;

  const [workState, workDispatch] = notNullStore;
  const { imageURL, mouseMode, objectList, classList, tagList } = workState;

  const boxList = objectList.map((content, index) => {
    const objects = objectExtractor(content, index);
    return objects;
  });

  const imageZoom = () => {
    if (imageZoomOut <= 1.6) {
      setImageZoomOut(parseFloat((imageZoomOut + 0.2).toFixed(2)));
    }
  };

  const imageOut = () => {
    if (imageZoomOut >= 0.4) {
      setImageZoomOut(parseFloat((imageZoomOut - 0.2).toFixed(2)));
    }
  };

  const onMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    onclickState.current['originPoint'][0] = imagePoint[0];
    onclickState.current['originPoint'][1] = imagePoint[1];

    onclickState.current['clickPoint'][0] = e.nativeEvent.offsetX;
    onclickState.current['clickPoint'][1] = e.nativeEvent.offsetY;

    onclickState.current['on'] = true;
  };

  const onMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (onclickState.current['on']) {
      const xMove =
        e.nativeEvent.offsetX - onclickState.current['clickPoint'][0];
      const yMove =
        e.nativeEvent.offsetY - onclickState.current['clickPoint'][1];

      setImagePoint([
        onclickState.current['originPoint'][0] + xMove,
        onclickState.current['originPoint'][1] + yMove,
      ]);
    }
  };

  const onMouseUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    onclickState.current['on'] = false;
  };

  return (
    <MainCanvas areaPercent={areaPercent}>
      <MainViewUtil>
        <Button variant="outlined" onClick={imageZoom}>
          +
        </Button>
        <div style={{ marginLeft: 7, marginRight: 7 }}>
          {imageZoomOut * 100}%
        </div>
        <Button variant="outlined" onClick={imageOut}>
          -
        </Button>
      </MainViewUtil>
      <svg
        style={canvasStyle}
        onMouseMove={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (workState.mouseMode == 'MOVE') {
            onMouseMove(e);
          }
        }}
        onMouseDown={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (workState.mouseMode == 'MOVE') {
            onMouseDown(e);
          }
        }}
        onMouseUp={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          if (workState.mouseMode == 'MOVE') {
            onMouseUp(e);
          }
        }}
      >
        <ImageCanvas
          boxes={boxList}
          imageURL={imageURL}
          imagePoint={imagePoint}
          imageZoomOut={imageZoomOut}
        />
      </svg>
    </MainCanvas>
  );
}

export default MainViewCanvas;
