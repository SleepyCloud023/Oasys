/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Button,
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  styled,
  css,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type PropsLink = {
  readonly to: string;
  readonly buttonVariant?: 'text' | 'outlined' | 'contained' | undefined;
} & MuiLinkProps;

const StyledButton = styled(Button)(
  ({ theme }) => css`
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.text.primary};
  `,
);

function Link({ to, buttonVariant = 'contained', ...props }: PropsLink) {
  return (
    <>
      <MuiLink underline="none" to={to} {...props} component={RouterLink}>
        <StyledButton variant={buttonVariant}>{props.children}</StyledButton>
      </MuiLink>
    </>
  );
}

export default Link;
