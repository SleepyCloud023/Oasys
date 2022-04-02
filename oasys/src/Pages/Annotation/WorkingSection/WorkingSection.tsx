import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import styled from 'styled-components';
import { ACTION, Annotation, WorkState } from './types';
import { getImageInfo, reducer } from './utils';
import { LeftControlPanel } from './LeftControlPanel';
import { MainViewPanel } from './MainViewPanel';
import { RightControlPanel } from './RightControlPanel';
import KeyboardEventHandler from './keyboardEventHandler';
import useEventListener from '../../../Utils/useEventListener';
import idGenerator from '../../../Utils/idGenerator';
import { AlertInfo } from '../../../Components/Alert/AlertBox';
import { saveAndAlert } from './saveButtonHandler';

const StyledWorkingSection = styled.article`
  /* 색상 */
  background-color: #26293b;

  /* 정렬 */
  flex: 70 0 0;
  display: flex;
  overflow-y: auto;

  /* 포커스 지원: 키보드 이벤트 핸들러 사용하기 위함 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const preLoading: WorkState = {
  id: -1,
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

type IdGenerator = () => number;
export const ObjectIdGenerator = createContext<IdGenerator>(() => 0);

type WorkingSectionProps = {
  id: number;
  setAlert: React.Dispatch<AlertInfo>;
};

function WorkingSection({ id, setAlert }: WorkingSectionProps) {
  const [workState, workDispatch] = useReducer(reducer, preLoading);
  const [firstId, setFirstId] = useState(0);

  const objectIdGenerator = useMemo(() => idGenerator(firstId), [firstId]);
  const keyInputHandler = useMemo(() => {
    return new KeyboardEventHandler(workState, workDispatch);
  }, [workState]);

  useEffect(() => {
    async function fetchInitStateFromAPI() {
      const initState = await getImageInfo(id);
      workDispatch({
        type: 'INIT_STATE',
        initState: initState,
      });

      setFirstId(() => initState.box_object_list.length);
    }
    fetchInitStateFromAPI();
  }, [id]);

  useEventListener('keydown', keyInputHandler.editSelected);

  const currentAnnotation: Annotation = workState;
  useEventListener('click', (event) =>
    saveAndAlert(event, id, currentAnnotation, setAlert),
  );

  return (
    <WorkStore.Provider value={[workState, workDispatch]}>
      <ObjectIdGenerator.Provider value={objectIdGenerator}>
        <StyledWorkingSection>
          <LeftControlPanel />
          <MainViewPanel areaPercent={80} />
          <RightControlPanel areaPercent={20} />
        </StyledWorkingSection>
      </ObjectIdGenerator.Provider>
    </WorkStore.Provider>
  );
}

export default WorkingSection;
