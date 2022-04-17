/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css, styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import { Link } from '@src/components';
import { To } from 'react-router-dom';

const StyledLink = styled(Link)(
  ({ theme }) => css`
    padding: 6px;
    padding-left: 0;
    box-sizing: border-box;
  `,
);

const styleImg = (theme: Theme) => css`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  /* border: 1px solid ${theme.palette.secondary.main}; */
  /* background-color: ${theme.palette.background.default}; */
  background-color: ${theme.palette.secondary.main};
`;

type LogoProps = { to?: To };

function Logo({ to = './home' }: LogoProps) {
  const theme: Theme = useTheme();
  return (
    <StyledLink to={to}>
      <img css={styleImg(theme)} src="/assets/img/oasis.png" alt="Oasys" />
    </StyledLink>
  );
}

export default Logo;
