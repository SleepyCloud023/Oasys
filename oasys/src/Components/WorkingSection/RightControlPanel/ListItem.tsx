import React, { useState } from 'react';
import { ACTION, BoxObject } from '../types';
import {
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BoxTooltip } from './ItemTooltip';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const StyledListItemContainer = styled(ListItem)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 3px;
  padding: 4px 8px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.info.light};
  }
`;

const StyledListItemText = styled(ListItemText)`
  margin: auto 6px;
  font-size: 0.8rem;
`;

const onSelect: (
  newSelected: Set<number> | string,
  dispatch: React.Dispatch<ACTION>,
) => React.MouseEventHandler<HTMLLIElement> = (newSelected, dispatch) => (e) => {
  dispatch({
    type: 'UPDATE_SELECTED',
    newSelected,
  });
};

export function BoxListItem(
  boxObject: BoxObject,
  index: number,
  dispatch: React.Dispatch<ACTION>,
) {
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
      <ZoomInIcon fontSize="small" />
    </IconButton>
  );

  const newSelected = new Set<number>([id]);

  return (
    <StyledListItemContainer
      key={index}
      onClick={onSelect(newSelected, dispatch)}
    >
      {optionalDivider}
      {numberChip}
      {textMainInfo}
      <BoxTooltip boxObject={boxObject}>{detailsIcon}</BoxTooltip>
    </StyledListItemContainer>
  );
}

export function ClassListItem(
  className: string,
  index: number,
  dispatch: React.Dispatch<ACTION>,
) {
  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={index} size={'small'} />;
  const textClassName = <StyledListItemText secondary={className} />;

  return (
    <StyledListItemContainer
      key={index}
      onClick={onSelect(className, dispatch)}
    >
      {optionalDivider}
      {numberChip}
      {textClassName}
    </StyledListItemContainer>
  );
}

export function TagListItem(
  tagName: string,
  index: number,
  dispatch: React.Dispatch<ACTION>,
) {
  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={index} size={'small'} />;
  const textTagName = <StyledListItemText secondary={tagName} />;

  return (
    <StyledListItemContainer key={index} onClick={onSelect(tagName, dispatch)}>
      {optionalDivider}
      {numberChip}
      {textTagName}
    </StyledListItemContainer>
  );
}
