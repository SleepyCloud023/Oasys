/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  NumberChip,
  OptionalDivider,
  StyledListItemContainer,
  StyledListItemText,
  ToggleListItemProps,
} from './Common';

type CategoryListItemProps = ToggleListItemProps & {
  readonly content: string;
};

export function CategoryListItem({
  content: categoryName,
  index,
  selectedHandler,
}: CategoryListItemProps) {
  const textClassName = <StyledListItemText secondary={categoryName} />;
  const type = 'category';
  const isSelected = selectedHandler.checkSelected({
    type,
    categoryName,
  });

  return (
    <StyledListItemContainer
      isSelected={isSelected}
      onClick={() => selectedHandler.onSelect({ type, categoryName })}
    >
      <OptionalDivider index={index} />
      <NumberChip id={index} />
      {textClassName}
    </StyledListItemContainer>
  );
}

export default CategoryListItem;
