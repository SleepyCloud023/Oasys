import React, { useState } from 'react';
import styled from 'styled-components';
import LeftControlPanel from './LeftControlPanel';
import MainViewCanvas from './MainViewCanvas/MainViewCanvas';
import RightControlPanel from './RightControlPanel';
import MockData from '../../MockData/MainView2.json';

const StyledWorkingSection = styled.div`
  /* 색상 */
  background-color: #26293b;

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
      <MainViewCanvas
        mockData={MockData}
        areaPercent={80}
        mouseMode={mouseMode}
      />
      <RightControlPanel mockData={MockData} areaPercent={20} />
    </StyledWorkingSection>
  );
}

export default WorkingSection;
