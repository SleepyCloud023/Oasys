/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Button,
  ButtonProps,
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  styled,
  css,
} from '@mui/material';
import { Link as RouterLink, To } from 'react-router-dom';

type PropsCustomButton = {
  readonly buttonVariant?: ButtonProps['variant'];
  readonly buttonColor?: ButtonProps['color'];
};

type PropsLink = {
  readonly to: To;
} & PropsCustomButton &
  MuiLinkProps;

const StyledButton = styled(Button)(
  ({ theme }) => css`
    color: ${theme.palette.text.primary};
  `,
);

function LinkButton({
  to,
  buttonVariant = 'contained',
  buttonColor = 'secondary',
  ...props
}: PropsLink) {
  return (
    <>
      <MuiLink underline="none" to={to} {...props} component={RouterLink}>
        <StyledButton variant={buttonVariant} color={buttonColor}>
          {props.children}
        </StyledButton>
      </MuiLink>
    </>
  );
}

export default LinkButton;
