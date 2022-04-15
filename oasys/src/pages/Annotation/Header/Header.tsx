import React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import AnnotationNavBar from './AnnotationNavBar';

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
      <AnnotationNavBar />
      {/* <Button style={{ backgroundColor: 'azure' }} variant="outlined">
        </Button> */}
    </StyledHeader>
  );
}

export default Header;
