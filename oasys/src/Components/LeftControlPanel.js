import React from "react";
import styled from "styled-components";

const StyledPanel = styled.div`
  border: 2px solid tomato;
  border-radius: 4px;
  color: white;
  font: bold;
  flex: 10 0 0;
`;

function LeftControlPanel() {
  return (
    <>
      <StyledPanel>Left</StyledPanel>
    </>
  );
}

export default LeftControlPanel;
