/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
  css,
} from '@mui/material';

type StyledProps = {
  readonly fullHeight?: boolean;
};

type ButtonProps = StyledProps & MuiButtonProps;

const StyledButton = styled(({ fullHeight, ...props }: ButtonProps) => (
  <MuiButton {...props} />
))(
  ({ theme, fullHeight }) => css`
    text-transform: none;
    color: ${theme.palette.text.primary};
    ${fullHeight
      ? css`
          height: 100%;
        `
      : null}
  `,
);

function Button({
  fullHeight = false,
  variant = 'text',
  color = 'secondary',
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      fullHeight={fullHeight}
      variant={variant}
      color={color}
      {...props}
    />
  );
}

export default Button;
