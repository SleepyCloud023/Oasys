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

type CategoryListItemProps = ToggleListItemProps & {
  readonly content: string;
};

export function CategoryListItem({
  content: categoryName,
  index,
  selectedHandler,
}: CategoryListItemProps) {
  // TODO: workDispatch를 직접 사용하기보다 selectedHandler와 비슷하게 해당 기능을 구현하는 클래스의 인터페이스 활용.
  const [, workDispatch] = useWorkStore();
  const TextCategoryName = () => (
    <StyledListItemText secondary={categoryName} />
  );

  const type = 'category';
  const isSelected = selectedHandler.checkSelected({
    type,
    categoryName,
  });

  const removeItem = () => {
    workDispatch({
      type: 'DELETE_CATEGORY',
      targetCategory: categoryName,
    });
  };

  return (
    <StyledListItemContainer
      isSelected={isSelected}
      onClick={() => selectedHandler.onSelect({ type, categoryName })}
    >
      <OptionalDivider index={index} />
      <NumberChip id={index + 1} />
      <TextCategoryName />
      <DeleteButton onClick={removeItem} />
    </StyledListItemContainer>
  );
}

export default CategoryListItem;
