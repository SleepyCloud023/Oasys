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

type TagListItemProps = ToggleListItemProps & {
  readonly content: string;
};

export function TagListItem({
  content: tagName,
  index,
  dispatch,
  selectedChecker,
}: TagListItemProps) {
  const textTagName = <StyledListItemText secondary={tagName} />;
  const isSelected = selectedChecker.checkSelected({
    type: 'tag',
    tagName,
  });

  return (
    <StyledListItemContainer
      onClick={onSelect(tagName, dispatch)}
      isSelected={isSelected}
    >
      <OptionalDivider index={index} />
      <NumberChip id={index} />
      {textTagName}
    </StyledListItemContainer>
  );
}

export default TagListItem;
