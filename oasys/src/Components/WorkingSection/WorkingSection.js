import React, { useState } from 'react';
import styled from 'styled-components';
import LeftControlPanel from './LeftControlPanel';
import MainViewCanvas from './MainViewCanvas/MainViewCanvas';
import RightControlPanel from './RightControlPanel';

const StyledWorkingSection = styled.div`
  /* 색상 */
  background-color: #252c2c;

  /* 정렬 */
  flex: 70 0 0;
  display: flex;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function WorkingSection({ children, ...rest }) {
  // move, box, polygon
  const [mouseMode, setMouseMode] = useState('move');

  return (
    <StyledWorkingSection {...rest}>
      <LeftControlPanel mouseMode={mouseMode} />
      <MainViewCanvas areaPercent={80} mouseMode={mouseMode} />
      <RightControlPanel areaPercent={20} />
    </StyledWorkingSection>
  );
}

export default WorkingSection;
