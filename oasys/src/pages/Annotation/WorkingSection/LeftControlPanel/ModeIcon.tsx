import React from 'react';
import PolylineIcon from '@mui/icons-material/Polyline';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import PanToolIcon from '@mui/icons-material/PanTool';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MouseMode } from '../types';
import { Theme } from '@mui/material/styles';

const colorSelected = (theme: Theme) => theme.palette.primary.main;

export const DefaultIconStyle = {
  color: 'azure',
  margin: '4px 0',
  fontSize: '1.5rem',
  cursor: 'pointer',

  '&:hover': {
    color: colorSelected,
  },
};
const currentModeStyle = { ...DefaultIconStyle, color: colorSelected };

type PropsIcon = {
  readonly mouseMode: MouseMode;
  readonly isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const modeIcons = {
  MOVE: PanToolIcon,
  BOX: HighlightAltIcon,
  POLYGON: PolylineIcon,
};

export function ModeIcon({ mouseMode, isSelected, onClick }: PropsIcon) {
  const iconStyle = isSelected ? currentModeStyle : DefaultIconStyle;
  const SelectedIcon = modeIcons[mouseMode];
  return (
    <Tooltip title={mouseMode} placement="right">
      <IconButton onClick={onClick}>
        <SelectedIcon sx={iconStyle}></SelectedIcon>
      </IconButton>
    </Tooltip>
  );
}
