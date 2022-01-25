import React from "react";
import styled from "styled-components";

const MainCanvas = styled.div`
  color: white;
  font: bold;
  font-size: 1.25rem;
  flex: 70 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MainViewCanvas() {
  return (
    <>
      <MainCanvas>
        <div>Main Canvas Area</div>
      </MainCanvas>
    </>
  );
}

export default MainViewCanvas;
