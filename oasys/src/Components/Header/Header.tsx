import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { AnnotationNavBar } from '../NavBar';

const StyledHeader = styled.header`
  background-color: #2d2f42;
  flex: 15 0 0;
`;

type PropsHeader = {
  readonly children?: React.ReactNode;
};

function Header({ children }: PropsHeader) {
  return (
    <StyledHeader>
      <Button style={{ backgroundColor: 'azure' }} variant="outlined">
        <AnnotationNavBar />
      </Button>
    </StyledHeader>
  );
}

export default Header;
