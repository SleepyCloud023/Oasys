import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import LeftControlPanel from './LeftControlPanel';
import MainViewPanel from './MainViewPanel/MainViewPanel';
import RightControlPanel from './RightControlPanel';
import reducer, { dummyFetchFileInfo } from './utils';

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

const preLoading = {
  mouseMode: 'MOVE',
  objectList: [],
  classList: [],
  tagList: [],
};

export const WorkDispatch = React.createContext(null);

function WorkingSection({ children, ...rest }) {
  // TODO: 각 컴포넌트 MOVE, BOX, POLYGON 모드 연동
  const [workState, workDispatch] = useReducer(reducer, preLoading);
  // TODO: 선택된 파일 로딩, async API call
  useEffect(() => {
    // mount될 때 수행할 작업
    const initStateFromAPI = dummyFetchFileInfo();
    // const initStateFromAPI_goal = await axios.get(URL_FILE_REQUEST);
    workDispatch({
      type: 'INIT_STATE',
      initState: initStateFromAPI,
    });
    // unmount될 때 수행할 작업
    return null;
  }, []);

  return (
    <WorkDispatch.Provider value={workDispatch}>
      <StyledWorkingSection {...rest}>
        <LeftControlPanel mouseMode={workState.mouseMode} />
        {/* <MainViewPanel areaPercent={80} workState={workState} /> */}
        <RightControlPanel areaPercent={20} workState={workState} />
      </StyledWorkingSection>
    </WorkDispatch.Provider>
  );
}

export default WorkingSection;
