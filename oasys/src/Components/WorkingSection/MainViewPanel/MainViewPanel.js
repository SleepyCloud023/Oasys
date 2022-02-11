import React, { useState, useRef, useContext } from 'react';
import styled, { css } from 'styled-components';
import { WorkStore } from '../WorkingSection';
import ImageCanvas from './ImageCanvas';

const MainCanvas = styled.div`
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
  display: flex;
  background-color: #1c1d1f;
`;

function objectExtractor(element, index) {
  const { Bbox, ...rest } = element;
  return Bbox;
}

const canvasStyle = {
  flex: '1 0 0',
};

function MainViewCanvas({ areaPercent, ...rest }) {
  const [workState, _workDispatch] = useContext(WorkStore);
  const { imageURL, mouseMode, objectList, classList, tagList } = workState;

  const [imagePoint, setImagePoint] = useState([50, 50]);
  const onclickState = useRef({
    originPoint: [50, 50],
    clickPoint: [0, 0],
    on: false,
  });

  const boxList = objectList.map((content, index) => {
    const objects = objectExtractor(content, index);
    return objects;
  });

  const onMouseDown = (e) => {
    onclickState.current['originPoint'][0] = imagePoint[0];
    onclickState.current['originPoint'][1] = imagePoint[1];

    onclickState.current['clickPoint'][0] = e.nativeEvent.offsetX;
    onclickState.current['clickPoint'][1] = e.nativeEvent.offsetY;

    onclickState.current['on'] = true;
  };

  const onMouseMove = (e) => {
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

  const onMouseUp = (e) => {
    onclickState.current['on'] = false;
  };

  return (
    <MainCanvas areaPercent={areaPercent} {...rest}>
      <svg
        style={canvasStyle}
        onMouseMove={(e) => {
          if (workState.mouseMode == 'MOVE') {
            onMouseMove(e);
          }
        }}
        onMouseDown={(e) => {
          if (workState.mouseMode == 'MOVE') {
            onMouseDown(e);
          }
        }}
        onMouseUp={(e) => {
          if (workState.mouseMode == 'MOVE') {
            onMouseUp(e);
          }
        }}
      >
        <ImageCanvas
          boxes={boxList}
          imageURL={imageURL}
          imagePoint={imagePoint}
        />
      </svg>
    </MainCanvas>
  );
}

export default MainViewCanvas;
