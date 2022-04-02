/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Alert from '@mui/material/Alert/Alert';
import Collapse from '@mui/material/Collapse/Collapse';
import IconButton from '@mui/material/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material';

export type AlertInfo = {
  open: boolean;
  success: boolean;
  message: string;
};

type AlertBoxProps = {
  sx?: SxProps<Theme>;
  onCloseIcon: React.MouseEventHandler<HTMLButtonElement>;
} & AlertInfo;

function AlertBox({ sx, open, success, message, onCloseIcon }: AlertBoxProps) {
  const CloseIconButton = () => (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={onCloseIcon}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );

  return (
    <Collapse in={open}>
      <Alert
        sx={sx}
        variant="filled"
        severity={success ? 'success' : 'error'}
        action={<CloseIconButton />}
      >
        {message}
      </Alert>
    </Collapse>
  );
}

export default AlertBox;
