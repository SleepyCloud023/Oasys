import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from './Dialog';

const StyledFooter = styled.footer`
  background-color: #2d2f42;
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

type PropsFooter = {
  readonly children?: React.ReactNode;
};

function Footer({ children }: PropsFooter) {
  const [dialogOn, setDialogOn] = useState(false);
  return (
    <StyledFooter>
      <StyledButton onClick={() => setDialogOn(true)}>
        테스트 모달 버튼
      </StyledButton>

      {/* <Dialog dialogOn={dialogOn} setDialogOn={setDialogOn} /> */}
    </StyledFooter>
  );
}

export default Footer;
