import React, { useState } from "react";
import styled, { css } from "styled-components";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import PanToolIcon from "@mui/icons-material/PanTool";
import PolylineIcon from "@mui/icons-material/Polyline";

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
  fontSize: "1.5rem",
  cursor: "pointer",

  "&:hover":{
    color : 'lightgreen',
    backgroundColor: 'lightgray',
  },
};

const ClickedIconStyle = {
  // 색상
  color: "lightgreen",
  backgroundColor: 'lightgray',
  border: "2px solid black",
  borderRadius: "3px",
  // 배치
  margin: "4px 0",
  // 크기
  // 1rem = 브라우저 16px
  fontSize: "1.5rem",
  cursor: "pointer",

  "&:hover":{
    color : 'azure',
    backgroundColor: 'black'
  },
};

const StyledButton = styled.button`
  border: 2px solid greenyellow;
  border-radius: 4px;
  background-color: azure;
  margin: 16px;
`;

function LeftControlPanel({ areaPercent, ...rest }) {
  const [panStyle , setPanStyle] = useState(ResizedIconStyle);
  const [highStyle, setHighStyle] = useState(ResizedIconStyle);
  const [polyStyle, setPolyStyle] = useState(ResizedIconStyle);
  const [mode, setMode] = useState(null)

  const onPanClick = () => {
    if (panStyle === ResizedIconStyle) {
      setPanStyle(ClickedIconStyle);
      setMode("Pan");
      if (highStyle === ClickedIconStyle) {
        setHighStyle(ResizedIconStyle);
      }
      else if (polyStyle === ClickedIconStyle) {
        setPolyStyle(ResizedIconStyle);
      }
    }
    else{
      setPanStyle(ResizedIconStyle);
      setMode(null);
    }
  };

  const onHighClick = () => {
    if (highStyle === ResizedIconStyle) {
      setHighStyle(ClickedIconStyle);
      setMode("High");
      if (panStyle === ClickedIconStyle) {
        setPanStyle(ResizedIconStyle);
      }
      else if (polyStyle === ClickedIconStyle) {
        setPolyStyle(ResizedIconStyle);
      }
    }
    else{
      setHighStyle(ResizedIconStyle);
      setMode(null);
    }
  }
  
  const onPolyClick = () => {
    if (polyStyle === ResizedIconStyle) {
      setPolyStyle(ClickedIconStyle);
      setMode("Poly");
      if (panStyle === ClickedIconStyle) {
        setPanStyle(ResizedIconStyle);
      }
      else if (highStyle === ClickedIconStyle) {
        setHighStyle(ResizedIconStyle);
      }
    }
    else{
      setPolyStyle(ResizedIconStyle);
      setMode(null);
    }
  };

  return (
    <StyledLeftPanel areaPercent={areaPercent} {...rest}>
      <PanToolIcon sx={panStyle} 
        onClick = {onPanClick}
      />
      <HighlightAltIcon sx={highStyle} 
        onClick = {onHighClick}
      />
      <PolylineIcon sx={polyStyle} 
        onClick = {onPolyClick}
      />
      <StyledButton>
        <h1>current Mode: {mode}</h1>
      </StyledButton>
    </StyledLeftPanel>
  );
}

export default LeftControlPanel;
