import React, { useContext } from 'react';
import styled from '@emotion/styled';
import ToggleList from './ToggleList';
import { BoxObject } from '../types';
import { WorkStore } from '../WorkingSection';
import { BoxListItem, ClassListItem, TagListItem } from './ListItem';

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
  const notNullStore = useContext(WorkStore);
  if (notNullStore === null) return null;

  const [workState] = notNullStore;
  const { box_object_list, categories, tag_list } = workState;

  return (
    <RightPanel areaPercent={areaPercent}>
      <ToggleList<BoxObject>
        title={'Bounding Box'}
        contentList={box_object_list}
        ListItemGenerator={BoxListItem}
        upperFixed
      />
      <ToggleList<string>
        title={'Class'}
        contentList={categories}
        ListItemGenerator={ClassListItem}
        addButton
        onAddButton={(event) => {
          event.stopPropagation();
          console.log(`add button clicked: `);
        }}
      />
      <ToggleList<string>
        title={'Tag'}
        contentList={tag_list}
        ListItemGenerator={TagListItem}
        addButton
        onAddButton={(event) => {
          event.stopPropagation();
          console.log(event.currentTarget);
        }}
      />
    </RightPanel>
  );
}

export default RightControlPanel;
