/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css, styled, Theme, useTheme } from '@mui/material/styles';
import { Link } from '@src/components';
import { To } from 'react-router-dom';

const StyledLink = styled(Link)(
  ({ theme }) => css`
    /* box-sizing: border-box; */
    margin-right: 1rem;
    border-radius: 1rem;
  `,
);

const styleFigure = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0;
  width: min-content;
  height: min-content;

  &:hover {
    transition-duration: 200ms;
    transform: scale(1.1);
  }
`;

const styleFigcaption = (theme: Theme) => css`
  position: absolute;
  /* color: ${theme.palette.secondary.main}; */
  /* color: ${theme.palette.secondary.dark}; */
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.75rem;
  font-weight: 900;
  /* font-style: italic; */
  font-family: 'Square Peg', cursive;
  text-align: center;
  bottom: -0.15rem;
  z-index: 1;
`;

const styleImg = (theme: Theme) => css`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;

  background: linear-gradient(
    to right,
    #ffdde1,
    #ee9ca7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

type LogoProps = { to?: To };

function Logo({ to = '/home' }: LogoProps) {
  const theme: Theme = useTheme();
  return (
    <StyledLink to={to}>
      <figure css={styleFigure(theme)}>
        <img css={styleImg(theme)} src="/assets/img/oasis.png" alt="Oasys" />
        <figcaption css={styleFigcaption(theme)}>OASYS</figcaption>
      </figure>
    </StyledLink>
  );
}

export default Logo;
