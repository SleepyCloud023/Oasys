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
  ${({ areaPercent }) => {
    if (!areaPercent) {
    } else {
      return `
        flex: ${areaPercent} 0 0;
      `;
    }
  }}
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
  const { objectList, classList, tagList } = workState;

  return (
    <RightPanel areaPercent={areaPercent}>
      <ToggleList<BoxObject>
        title={'Bounding Box'}
        contentList={objectList}
        ListItemGenerator={BoxListItem}
        upperFixed
      />
      <ToggleList<string>
        title={'Class'}
        contentList={classList}
        ListItemGenerator={ClassListItem}
      />
      <ToggleList<string>
        title={'Tag'}
        contentList={tagList}
        ListItemGenerator={TagListItem}
      />
    </RightPanel>
  );
}

export default RightControlPanel;
