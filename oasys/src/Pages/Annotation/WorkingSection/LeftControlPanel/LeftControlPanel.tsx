import React from 'react';
import styled from '@emotion/styled';
import { MouseMode } from '../types';
import { ModeIcon } from './ModeIcon';
import { useWorkStore } from '../utils';

type PropsLeftControlPanel = {
  readonly areaPercent?: number;
};

const StyledLeftPanel = styled.div<PropsLeftControlPanel>`
  /* 색상 */
  color: white;
  border: 1px solid azure;
  border-radius: 3px;

  font: bold;

  /* 배치 */
  ${({ areaPercent }) => {
    return areaPercent
      ? `
        flex: ${areaPercent} 0 0;
      `
      : null;
  }}
  display: flex;
  flex-flow: column;
  padding: 2px;
`;

function LeftControlPanel({ areaPercent }: PropsLeftControlPanel) {
  const [workState, workDispatch] = useWorkStore();
  const { mouseMode } = workState;

  const changeMouseMode = (nextMode: MouseMode) => {
    workDispatch({
      type: 'CHANGE_MOUSEMODE',
      nextMode,
    });
    workDispatch({
      type: 'UPDATE_SELECTED',
      newSelected: new Set(),
    });
  };

  const defaultMouseMode = 'MOVE';

  const onIconClick = (targetMode: MouseMode) =>
    targetMode === mouseMode
      ? changeMouseMode(defaultMouseMode)
      : changeMouseMode(targetMode);

  return (
    <StyledLeftPanel areaPercent={areaPercent}>
      <ModeIcon
        mouseMode="MOVE"
        isSelected={mouseMode === 'MOVE'}
        onClick={() => onIconClick('MOVE')}
      />
      <ModeIcon
        mouseMode="BOX"
        isSelected={mouseMode === 'BOX'}
        onClick={() => onIconClick('BOX')}
      />
      <ModeIcon
        mouseMode="POLYGON"
        isSelected={mouseMode === 'POLYGON'}
        onClick={() => onIconClick('POLYGON')}
      />
    </StyledLeftPanel>
  );
}

export default LeftControlPanel;
