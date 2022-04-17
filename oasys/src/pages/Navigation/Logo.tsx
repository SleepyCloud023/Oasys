/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css, styled, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import { Link } from '@src/components';
import { To } from 'react-router-dom';

const StyledLink = styled(Link)(
  ({ theme }) => css`
    /* box-sizing: border-box; */
    margin-right: 1rem;
  `,
);

const styleFigure = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0;

  &:hover {
    transition-duration: 200ms;
    transform: scale(1.1);
  }
`;

const styleFigcaption = (theme: Theme) => css`
  position: absolute;
  color: ${theme.palette.secondary.dark};
  /* color: ${theme.palette.secondary.main}; */
  font-size: 0.3rem;
  font-weight: 700;
  text-align: center;
  bottom: -0.3rem;
  z-index: 1;
`;

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
      <figure css={styleFigure(theme)}>
        <img css={styleImg(theme)} src="/assets/img/oasis.png" alt="Oasys" />
        <figcaption css={styleFigcaption(theme)}>oasys</figcaption>
      </figure>
    </StyledLink>
  );
}

export default Logo;
