import React, { useContext } from 'react';
import styled from 'styled-components';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import PanToolIcon from '@mui/icons-material/PanTool';
import PolylineIcon from '@mui/icons-material/Polyline';
import { WorkStore } from './WorkingSection';
import { MouseMode } from './types';

type PropsLeftControlPanel = {
  readonly areaPercent?: number;
};

const StyledLeftPanel = styled.div<PropsLeftControlPanel>`
  /* 색상 */
  color: white;
  border: 2px solid azure;
  border-radius: 4px;

  font: bold;

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
  flex-flow: column;
  padding: 2px;
`;

const DefaultIconStyle = {
  // 색상
  color: 'azure',
  border: '2px solid black',
  borderRadius: '3px',
  // 배치
  margin: '4px 0',
  // 크기
  // 1rem = 브라우저 16px
  fontSize: '1.5rem',
  cursor: 'pointer',

  '&:hover': {
    color: 'lightgreen',
    backgroundColor: 'lightgray',
  },
};

function LeftControlPanel({ areaPercent }: PropsLeftControlPanel) {
  const notNullStore = useContext(WorkStore);
  if (notNullStore === null) return null;

  const [workState, workDispatch] = notNullStore;
  const { mouseMode } = workState;
  const changeMouseMode = (nextMode: MouseMode) => {
    workDispatch({
      type: 'CHANGE_MOUSEMODE',
      nextMode,
    });
  };
  const defaultMouseMode = 'MOVE';
  const currentModeStyle = { ...DefaultIconStyle, color: 'lightgreen' };

  const getIconStyle = (targetMode: MouseMode) =>
    targetMode === mouseMode ? currentModeStyle : DefaultIconStyle;

  const onIconClick = (targetMode: MouseMode) =>
    targetMode === mouseMode
      ? changeMouseMode(defaultMouseMode)
      : changeMouseMode(targetMode);

  return (
    <StyledLeftPanel areaPercent={areaPercent}>
      <PanToolIcon
        sx={getIconStyle('MOVE')}
        onClick={() => onIconClick('MOVE')}
      />
      <HighlightAltIcon
        sx={getIconStyle('BOX')}
        onClick={() => onIconClick('BOX')}
      />
      <PolylineIcon
        sx={getIconStyle('POLYGON')}
        onClick={() => onIconClick('POLYGON')}
      />
    </StyledLeftPanel>
  );
}

export default LeftControlPanel;
