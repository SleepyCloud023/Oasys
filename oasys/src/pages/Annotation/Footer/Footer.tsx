import Button from '@mui/material/Button/Button';
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

type PropsFooter = {
  readonly children?: React.ReactNode;
};

function Footer({ children }: PropsFooter) {
  const SaveButton = () => (
    <Button name="save-button" variant="outlined">
      Save Annotation
    </Button>
  );

  return (
    <StyledFooter>
      <SaveButton />
    </StyledFooter>
  );
}

export default Footer;
