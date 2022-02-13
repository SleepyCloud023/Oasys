import React from 'react';
import styled from 'styled-components';
import { AnnotationNavBar } from '../NavBar';

const StyledHeader = styled.header`
  background-color: #2d2f42;
  flex: 15 0 0;
  display: flex;
`;

type PropsHeader = {
  readonly children?: React.ReactNode;
};

function Header({ children }: PropsHeader) {
  return (
    <StyledHeader>
      <AnnotationNavBar />
    </StyledHeader>
  );
}

export default Header;
