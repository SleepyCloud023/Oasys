/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  NumberChip,
  onSelect,
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
  dispatch,
  selectedChecker,
}: CategoryListItemProps) {
  const textClassName = <StyledListItemText secondary={categoryName} />;
  const isSelected = selectedChecker.checkSelected({
    type: 'category',
    categoryName,
  });

  return (
    <StyledListItemContainer
      isSelected={isSelected}
      onClick={onSelect(categoryName, dispatch)}
    >
      <OptionalDivider index={index} />
      <NumberChip id={index} />
      {textClassName}
    </StyledListItemContainer>
  );
}

export default CategoryListItem;
