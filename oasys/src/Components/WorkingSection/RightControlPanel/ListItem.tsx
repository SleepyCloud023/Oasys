import React, { useState } from 'react';
import { BoxObject } from '../types';
import {
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { BoxTooltip } from './ItemTooltip';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const StyledListItemContainer = styled(ListItem)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 3px;
  padding: 4px 8px;
`;

const StyledListItemText = styled(ListItemText)`
  margin: auto 6px;
  font-size: 0.8rem;
`;

export function BoxListItem(boxObject: BoxObject, index: number) {
  // const [hover, setHover] = useState(false);
  const { id, category } = boxObject;

  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={id} size={'small'} />;
  const textMainInfo = (
    <StyledListItemText
      secondary={`
  ${'Class: '}${category.length > 0 ? category : '[]'}
  `}
    />
  );
  const detailsIcon = (
    <IconButton sx={{ padding: 0, marginLeft: 'auto' }}>
      <ZoomInIcon />
    </IconButton>
  );

  return (
    <StyledListItemContainer key={index}>
      {optionalDivider}
      {numberChip}
      {textMainInfo}
      <BoxTooltip boxObject={boxObject}>{detailsIcon}</BoxTooltip>
    </StyledListItemContainer>
  );
}

export function ClassListItem(className: string, index: number) {
  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={index} size={'small'} />;
  const textMainInfo = <StyledListItemText secondary={className} />;
  return (
    <StyledListItemContainer key={index}>
      {optionalDivider}
      {numberChip}
      {textMainInfo}
    </StyledListItemContainer>
  );
}

export function TagListItem(tagName: string, index: number) {
  const content = `[${index}]: ${tagName}`;
  return content;
}
