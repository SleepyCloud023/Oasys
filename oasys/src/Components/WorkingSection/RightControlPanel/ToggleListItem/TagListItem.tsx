/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  NumberChip,
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
  selectedHandler,
}: TagListItemProps) {
  const textTagName = <StyledListItemText secondary={tagName} />;
  const type = 'tag';
  const isSelected = selectedHandler.checkSelected({
    type,
    tagName,
  });

  return (
    <StyledListItemContainer
      onClick={() => selectedHandler.onSelect({ type, tagName })}
      isSelected={isSelected}
    >
      <OptionalDivider index={index} />
      <NumberChip id={index} />
      {textTagName}
    </StyledListItemContainer>
  );
}

export default TagListItem;
