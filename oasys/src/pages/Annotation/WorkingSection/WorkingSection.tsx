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
import { saveAndAlert } from './saveButtonHandler';
import KeyboardEventHandler from './keyboardEventHandler';
import { AlertInfo } from '@components/Alert/AlertBox';
import useEventListener from '@hooks/useEventListener';
import idGenerator from '@utils/idGenerator';

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

  useEventListener('click', (event) =>
    saveAndAlert(event, id, workState, setAlert),
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
