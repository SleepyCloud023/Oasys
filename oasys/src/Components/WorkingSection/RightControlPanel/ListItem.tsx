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

type ListItemContainerProps = { readonly isSelected: boolean };

const StyledListItemContainer = styled(ListItem)<ListItemContainerProps>`
  background-color: white;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.palette.info.main : theme.palette.info.light};
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
) => React.MouseEventHandler<HTMLLIElement> = (newSelected, dispatch) => () => {
  dispatch({
    type: 'UPDATE_SELECTED',
    newSelected,
  });
};

type ListItemProps = {
  readonly index: number;
  readonly dispatch: React.Dispatch<ACTION>;
  readonly isSelected: boolean;
};

type BoxListItemProps = ListItemProps & {
  readonly content: BoxObject;
};

export function BoxListItem({
  content: boxObject,
  index,
  dispatch,
  isSelected,
}: BoxListItemProps) {
  const { id, category } = boxObject;

  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={id} size={'small'} />;
  const textMainInfo = (
    <StyledListItemText
      secondary={`
  ${category.length > 0 ? category.join(',') : 'X'}
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
      onClick={onSelect(newSelected, dispatch)}
      isSelected={isSelected}
    >
      {optionalDivider}
      {numberChip}
      {textMainInfo}
      <BoxTooltip boxObject={boxObject}>{detailsIcon}</BoxTooltip>
    </StyledListItemContainer>
  );
}

type CategoryListItemProps = ListItemProps & {
  readonly content: string;
};

export function CategoryListItem({
  content: className,
  index,
  dispatch,
  isSelected,
}: CategoryListItemProps) {
  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={index} size={'small'} />;
  const textClassName = <StyledListItemText secondary={className} />;

  return (
    <StyledListItemContainer
      isSelected={isSelected}
      onClick={onSelect(className, dispatch)}
    >
      {optionalDivider}
      {numberChip}
      {textClassName}
    </StyledListItemContainer>
  );
}

type TagListItemProps = ListItemProps & {
  readonly content: string;
};

export function TagListItem({
  content: tagName,
  index,
  dispatch,
  isSelected,
}: TagListItemProps) {
  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={index} size={'small'} />;
  const textTagName = <StyledListItemText secondary={tagName} />;

  return (
    <StyledListItemContainer
      onClick={onSelect(tagName, dispatch)}
      isSelected={isSelected}
    >
      {optionalDivider}
      {numberChip}
      {textTagName}
    </StyledListItemContainer>
  );
}
