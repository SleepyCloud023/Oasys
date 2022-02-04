import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #2d2f42;
  flex: 15 0 0;
  display: flex;
`;

function Header({ children, ...rest }) {
  return <StyledHeader {...rest}>{children}</StyledHeader>;
}

export default Header;
