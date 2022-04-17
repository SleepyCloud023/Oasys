/** @jsxImportSource @emotion/react */
import React from 'react';
import Logo from '@components/Logo/Logo';
import { css } from '@mui/material/styles';

const styleNav = css`
  padding: 10px;
  padding-left: 15px;
`;

function AnnotationNavBar() {
  return (
    <nav css={styleNav}>
      <Logo />
    </nav>
  );
}

export default AnnotationNavBar;
