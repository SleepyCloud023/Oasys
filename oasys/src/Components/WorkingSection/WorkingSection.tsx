import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { ACTION, WorkState } from './types';
import { dummyFetchFileInfo, reducer } from './utils';
import { LeftControlPanel } from './LeftControlPanel';
import { MainViewPanel } from './MainViewPanel';
import { RightControlPanel } from './RightControlPanel';

const StyledWorkingSection = styled.article`
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

const preLoading: WorkState = {
  statusText: 'PRELOADING',
  mouseMode: 'MOVE',
  imageURL: '',
  imageName: '',
  imageSize: '340 453',
  box_object_list: [],
  selectedBoxList: new Set<number>(),
  category_list: [],
  tag_list: [],
};

export const WorkStore = React.createContext<
  [WorkState, React.Dispatch<ACTION>] | null
>(null);

function WorkingSection() {
  const [workState, workDispatch] = useReducer(reducer, preLoading);
  // TODO: 선택된 파일 로딩, async API call
  useEffect(() => {
    // mount될 때 수행할 작업
    const initStateFromAPI = dummyFetchFileInfo();
    // TODO: 컴포넌트 인자로 요청할 이미지 파일 id를 받아 처리
    // const initStateFromAPI_goal = await axios.get(imageID);
    initStateFromAPI.then((response) => {
      workDispatch({
        type: 'INIT_STATE',
        initState: response,
      });
    });
    // unmount될 때 수행할 작업
  }, []);

  return (
    <WorkStore.Provider value={[workState, workDispatch]}>
      <StyledWorkingSection>
        <LeftControlPanel />
        <MainViewPanel areaPercent={80} />
        <RightControlPanel areaPercent={20} />
      </StyledWorkingSection>
    </WorkStore.Provider>
  );
}

export default WorkingSection;
