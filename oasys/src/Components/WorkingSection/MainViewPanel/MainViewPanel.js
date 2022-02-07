import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import SvgCanvas from './SvgCanvas';

const MainCanvas = styled.div`
  color: white;
  font: bold;
  font-size: 1.25rem;
  /* 배치 */
  ${({ areaPercent }) => {
    if (!areaPercent) {
      console.log('MainCanvas: areaPercent is needed');
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
  const { ClassName, Bbox } = element.Object;
  return Bbox;
}

const canvasStyle = {
  flex: '1 0 0',
};

function MainViewCanvas({ areaPercent, workState, ...rest }) {
  const { mouseMode, objectList, classList, tagList } = workState;

  console.log('MainView', objectList);

  const boxList = objectList.map((content, index) => {
    const objects = objectExtractor(content, index);
    return objects;
  });
  const [boxes, setBoxes] = useState(boxList);

  const onAdd = (newBox) => {
    setBoxes([...boxes, newBox]);
  };

  return (
    <MainCanvas areaPercent={areaPercent} {...rest}>
      <svg style={canvasStyle}>
        <SvgCanvas boxes={boxes} onAdd={onAdd} />
      </svg>
    </MainCanvas>
  );
}

export default MainViewCanvas;
