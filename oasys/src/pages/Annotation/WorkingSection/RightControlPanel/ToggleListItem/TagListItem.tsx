/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useWorkStore } from '../../utils';
import {
  DeleteButton,
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
  const [, workDispatch] = useWorkStore();

  const TextTagName = () => <StyledListItemText secondary={tagName} />;
  const type = 'tag';
  const isSelected = selectedHandler.checkSelected({
    type,
    tagName,
  });

  const removeItem = () => {
    workDispatch({
      type: 'DELETE_TAG',
      targetTag: tagName,
    });
  };

  return (
    <StyledListItemContainer
      onClick={() => selectedHandler.onSelect({ type, tagName })}
      isSelected={isSelected}
    >
      <OptionalDivider index={index} />
      <NumberChip id={index} />
      <TextTagName />
      <DeleteButton onClick={removeItem} />
    </StyledListItemContainer>
  );
}

export default TagListItem;
