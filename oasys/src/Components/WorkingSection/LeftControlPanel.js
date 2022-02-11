import React, { useContext } from 'react';
import styled from 'styled-components';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import PanToolIcon from '@mui/icons-material/PanTool';
import PolylineIcon from '@mui/icons-material/Polyline';
import { WorkStore } from './WorkingSection';

const StyledLeftPanel = styled.div`
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

function LeftControlPanel({ areaPercent, mouseMode, ...rest }) {
  const [_workState, workDispatch] = useContext(WorkStore);
  const changeMouseMode = (nextMode) => {
    workDispatch({
      type: 'CHANGE_MOUSEMODE',
      nextMode,
    });
  };
  const defaultMouseMode = 'MOVE';
  const currentModeStyle = { ...DefaultIconStyle, color: 'lightgreen' };

  const getIconStyle = (targetMode) =>
    targetMode === mouseMode ? currentModeStyle : DefaultIconStyle;

  const onIconClick = (targetMode) =>
    targetMode === mouseMode
      ? changeMouseMode(defaultMouseMode)
      : changeMouseMode(targetMode);

  return (
    <StyledLeftPanel areaPercent={areaPercent} {...rest}>
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
