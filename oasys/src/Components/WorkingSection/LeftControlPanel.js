import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import PanToolIcon from '@mui/icons-material/PanTool';
import PolylineIcon from '@mui/icons-material/Polyline';

const StyledLeftPanel = styled.div`
  /* 색상 */
  color: white;
  border: 2px solid azure;
  border-radius: 4px;

  font: bold;

  /* 배치 */
  ${({ areaPercent }) => {
    if (!areaPercent) {
      console.log('StyledLeftPanel: areaPercent is undefined');
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

const ResizedIconStyle = {
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

function LeftControlPanel({ areaPercent, ...rest }) {
  const panStyle = { ...ResizedIconStyle, color: 'azure' };
  const highStyle = { ...ResizedIconStyle, color: 'azure' };
  const polyStyle = { ...ResizedIconStyle, color: 'azure' };

  const [mode, setMode] = useState(null);
  switch (mode) {
    case 'Pan':
      panStyle.color = 'lightgreen';
      break;
    case 'High':
      highStyle.color = 'lightgreen';
      break;
    case 'Poly':
      polyStyle.color = 'lightgreen';
      break;
    default:
      break;
  }

  return (
    <StyledLeftPanel areaPercent={areaPercent} {...rest}>
      <PanToolIcon
        sx={panStyle}
        onClick={() => (mode === 'Pan' ? setMode(null) : setMode('Pan'))}
      />
      <HighlightAltIcon
        sx={highStyle}
        onClick={() => (mode === 'High' ? setMode(null) : setMode('High'))}
      />
      <PolylineIcon
        sx={polyStyle}
        onClick={() => (mode === 'Poly' ? setMode(null) : setMode('Poly'))}
      />
    </StyledLeftPanel>
  );
}

export default LeftControlPanel;
