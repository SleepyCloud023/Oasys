import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ToggleList from './ToggleList';
import { BoxObject } from '../types';
import { BoxListItem, CategoryListItem, TagListItem } from './ToggleListItem';
import { useWorkStore } from '../utils';
import SelectedHandler, { SelectedInfo } from './SelectedHandler';

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
  const [workState, workDispatch] = useWorkStore();
  const { box_object_list, category_list, tag_list, selectedBoxList } =
    workState;

  const defaultSelectedInfo: SelectedInfo = useMemo(
    () => ({
      selectedBoxSet: selectedBoxList,
      selectedCategorySet: new Set<string>(),
      selectedTagSet: new Set<string>(),
      isOwnEvent: false,
    }),
    [selectedBoxList],
  );

  const [selectedInfo, setSelectedInfo] =
    useState<SelectedInfo>(defaultSelectedInfo);

  useEffect(() => {
    setSelectedInfo((prevSelectedInfo) => {
      const nextSelectedInfo = selectedInfo.isOwnEvent
        ? prevSelectedInfo
        : defaultSelectedInfo;
      return {
        ...nextSelectedInfo,
        selectedBoxSet: selectedBoxList,
        isOwnEvent: false,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBoxList]);

  const selectedHandler = useMemo(
    () => new SelectedHandler(selectedInfo, setSelectedInfo, workDispatch),
    [selectedInfo, workDispatch],
  );

  const boundingBoxList = useMemo(
    () => (
      <ToggleList<BoxContent>
        title={'Bounding Box'}
        type={'box'}
        contentList={box_object_list}
        ListItemGenerator={BoxListItem}
        selectedHandler={selectedHandler}
        upperFixed
      />
    ),
    [box_object_list, selectedHandler],
  );

  const categoryList = useMemo(
    () => (
      <ToggleList<CategoryContent>
        title={'Class'}
        type={'category'}
        contentList={category_list}
        ListItemGenerator={CategoryListItem}
        selectedHandler={selectedHandler}
        addButton
      />
    ),
    [category_list, selectedHandler],
  );

  const tagList = useMemo(
    () => (
      <ToggleList<TagContent>
        title={'Tag'}
        type={'tag'}
        contentList={tag_list}
        ListItemGenerator={TagListItem}
        selectedHandler={selectedHandler}
        addButton
      />
    ),
    [tag_list, selectedHandler],
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
