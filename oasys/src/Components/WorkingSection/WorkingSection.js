import React, { useReducer } from 'react';
import styled from 'styled-components';
import LeftControlPanel from './LeftControlPanel';
import MainViewCanvas from './MainViewCanvas/MainViewCanvas';
import RightControlPanel from './RightControlPanel';
import reducer from './utils';

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

export const WorkDispatch = React.createContext(null);

function WorkingSection({ children, ...rest }) {
  // TODO: 각 컴포넌트 MOVE, BOX, POLYGON 모드 연동
  const initialState = { mouseMode: 'MOVE' };
  const [workState, workDispatch] = useReducer(reducer, initialState);

  return (
    <WorkDispatch.Provider value={workDispatch}>
      <StyledWorkingSection {...rest}>
        <LeftControlPanel mouseMode={workState.mouseMode} />
        <MainViewCanvas areaPercent={80} mouseMode={workState.mouseMode} />
        <RightControlPanel areaPercent={20} />
      </StyledWorkingSection>
    </WorkDispatch.Provider>
  );
}

export default WorkingSection;
