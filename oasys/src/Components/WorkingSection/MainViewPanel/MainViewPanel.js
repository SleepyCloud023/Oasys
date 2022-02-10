import React, { useState, useRef, useContext } from 'react';
import styled, { css } from 'styled-components';
import { WorkStore } from '../WorkingSection';
import SvgCanvas from './SvgCanvas';

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

  const boxList = objectList.map((content, index) => {
    const objects = objectExtractor(content, index);
    return objects;
  });

  return (
    <MainCanvas areaPercent={areaPercent} {...rest}>
      <svg style={canvasStyle}>
        <SvgCanvas boxes={boxList} imageURL={imageURL} />
      </svg>
    </MainCanvas>
  );
}

export default MainViewCanvas;
