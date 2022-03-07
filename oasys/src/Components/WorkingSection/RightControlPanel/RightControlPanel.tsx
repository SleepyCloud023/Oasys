import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ToggleList from './ToggleList';
import { BoxObject } from '../types';
import { BoxListItem, CategoryListItem, TagListItem } from './ToggleListItem';
import { useWorkStore } from '../utils';
import SelectedChecker, { SelectedInfo } from './SelectedChecker';

export type BoxContent = BoxObject;
export type CategoryContent = string;
export type TagContent = string;

type PropsRightControlPanel = {
  readonly areaPercent?: number;
};

const RightPanel = styled.section<PropsRightControlPanel>`
  /* 배치 */
  ${({ areaPercent }) =>
    areaPercent
      ? `
        flex: ${areaPercent} 0 0;
      `
      : null}
  /* 스크롤 설정 */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  /* 레이아웃 */
  display: flex;
  flex-flow: column;
  justify-content: end;
`;

function RightControlPanel({ areaPercent }: PropsRightControlPanel) {
  // TODO: ToggleList에 selectedInfo를 전달해서 선택된 박스 오브젝트를 알 수 있는 기능
  // Working Section에서 받아온 State를 하위 컴포넌트로 내려줌
  const [workState] = useWorkStore();
  const { box_object_list, category_list, tag_list, selectedBoxList } =
    workState;

  const [selectedInfo, setSelectedInfo] = useState<SelectedInfo>({
    selectedBoxSet: selectedBoxList,
    selectedCategorySet: new Set<string>(),
    selectedTagSet: new Set<string>(),
  });

  useEffect(() => {
    setSelectedInfo((prevSelectedInfo) => ({
      ...prevSelectedInfo,
      selectedBoxSet: selectedBoxList,
    }));
  }, [selectedBoxList]);

  const selectedChecker = useMemo(
    () => new SelectedChecker(selectedInfo),
    [selectedInfo],
  );

  const boundingBoxList = useMemo(
    () => (
      <ToggleList<BoxContent>
        title={'Bounding Box'}
        contentList={box_object_list}
        selectedChecker={selectedChecker}
        ListItemGenerator={BoxListItem}
        upperFixed
      />
    ),
    [box_object_list, selectedChecker],
  );

  const categoryList = useMemo(
    () => (
      <ToggleList<CategoryContent>
        title={'Class'}
        contentList={category_list}
        selectedChecker={selectedChecker}
        ListItemGenerator={CategoryListItem}
        addButton
      />
    ),
    [category_list, selectedChecker],
  );

  const tagList = useMemo(
    () => (
      <ToggleList<TagContent>
        title={'Tag'}
        contentList={tag_list}
        selectedChecker={selectedChecker}
        ListItemGenerator={TagListItem}
        addButton
      />
    ),
    [selectedChecker, tag_list],
  );

  return (
    <RightPanel areaPercent={areaPercent}>
      {boundingBoxList}
      {categoryList}
      {tagList}
    </RightPanel>
  );
}

export default RightControlPanel;
