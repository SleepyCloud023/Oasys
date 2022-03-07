/** @jsxImportSource @emotion/react */
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { BoxObject } from '../../types';
import {
  NumberChip,
  onSelect,
  OptionalDivider,
  StyledListItemContainer,
  StyledListItemText,
  ToggleListItemProps,
} from './Common';
import { BoxTooltip } from './ItemTooltip';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

type BoxListItemProps = ToggleListItemProps & {
  readonly content: BoxObject;
};

function BoxListItem({
  content: boxObject,
  index,
  dispatch,
  selectedChecker,
}: BoxListItemProps) {
  const { id, category } = boxObject;

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
  const isSelected = selectedChecker.checkSelected({
    type: 'box',
    boxObject,
  });

  return (
    <StyledListItemContainer
      onClick={onSelect(newSelected, dispatch)}
      isSelected={isSelected}
    >
      <OptionalDivider index={index} />
      <NumberChip id={index} />
      {textMainInfo}
      <BoxTooltip boxObject={boxObject}>{detailsIcon}</BoxTooltip>
    </StyledListItemContainer>
  );
}

export default BoxListItem;
