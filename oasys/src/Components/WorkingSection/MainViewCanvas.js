import React from "react";
import styled, { css } from "styled-components";

const MainCanvas = styled.div`
  color: white;
  font: bold;
  font-size: 1.25rem;
  /* 배치 */
  ${({ areaPercent }) => {
    if (!areaPercent) {
      console.log("MainCanvas: areaPercent is needed");
    } else {
      return `
        flex: ${areaPercent} 0 0;
      `;
    }
  }}
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MainViewCanvas({ areaPercent, ...rest }) {
  return (
    <>
      <MainCanvas areaPercent={areaPercent} {...rest}>
        <div>Main Canvas Area</div>
      </MainCanvas>
    </>
  );
}

export default MainViewCanvas;
