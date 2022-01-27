import React from "react";
import styled from "styled-components";
import LeftControlPanel from "./LeftControlPanel";
import MainViewCanvas from "./MainViewCanvas";
import RightControlPanel from "./RightControlPanel";

const StyledWorkingSection = styled.div`
  /* 색상 */
  background-color: #252c2c;

  /* 정렬 */
  flex: 70 0 0;
  display: flex;
`;

function WorkingSection({ children, ...rest }) {
  return (
    <StyledWorkingSection {...rest}>
      <LeftControlPanel />
      <MainViewCanvas areaPercent={80} />
      <RightControlPanel areaPercent={20} />
    </StyledWorkingSection>
  );
}

export default WorkingSection;
