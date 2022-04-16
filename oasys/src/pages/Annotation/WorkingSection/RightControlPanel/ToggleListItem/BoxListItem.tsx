/** @jsxImportSource @emotion/react */
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { BoxObject } from '../../types';
import {
  NumberChip,
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
  selectedHandler,
}: BoxListItemProps) {
  const { id, category } = boxObject;

  const TextMainInfo = ({ category }: { category: string[] }) => {
    const content = category.length > 0 ? category.join(',') : '-';
    return <StyledListItemText secondary={content} />;
  };

  const detailsIcon = (
    <IconButton sx={{ padding: 0, marginLeft: 'auto' }}>
      <ZoomInIcon fontSize="small" />
    </IconButton>
  );

  const type = 'box';
  const isSelected = selectedHandler.checkSelected({
    type,
    boxObject,
  });
  const newSelected = new Set<number>([id]);

  return (
    <StyledListItemContainer
      onClick={() => selectedHandler.onSelect({ type, newSelected })}
      isSelected={isSelected}
    >
      <OptionalDivider index={index} />
      <NumberChip id={index} />
      <TextMainInfo category={category} />
      <BoxTooltip boxObject={boxObject}>{detailsIcon}</BoxTooltip>
    </StyledListItemContainer>
  );
}

export default BoxListItem;
