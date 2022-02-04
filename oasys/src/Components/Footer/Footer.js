import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from './Dialog';

const StyledFooter = styled.footer`
  background-color: gray;
  flex: 15 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledButton = styled.button`
  border: 2px solid greenyellow;
  border-radius: 4px;
  background-color: azure;
  margin: 16px;
`;

function Footer({ children, ...rest }) {
  const [mouseMode, setMouseMode] = useState('move');
  const [dialogOn, setDialogOn] = useState(false);
  return (
    <StyledFooter {...rest}>
      <StyledButton onClick={() => setDialogOn(true)}>
        테스트 모달 버튼
      </StyledButton>
      {/* 연습용 */}
      {/* <StyledButton onClick={() => setMouseMode("move")}>
        move 모드
      </StyledButton>
      <StyledButton onClick={() => setMouseMode("box")}>box 모드</StyledButton>
      <StyledButton onClick={() => setMouseMode("polygon")}>
        polygon 모드
      </StyledButton>
      <StyledButton>
        <h1>current Mode: {mouseMode}</h1>
      </StyledButton> */}

      <Dialog dialogOn={dialogOn} setDialogOn={setDialogOn} />
    </StyledFooter>
  );
}

export default Footer;
