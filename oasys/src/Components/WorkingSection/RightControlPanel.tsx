import React, { useContext } from 'react';
import styled from 'styled-components';
import ToggleList from './ToggleList';
import { BoxObject } from './types';
import { WorkStore } from './WorkingSection';

type PropsRightControlPanel = {
  readonly areaPercent?: number;
};

const RightPanel = styled.div<PropsRightControlPanel>`
  border: 1px solid transparent;
  border-radius: 3px;
  border: 2px solid azure;
  color: white;
  font: bold;
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
  overflow-y: auto;
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
  // if (typeof workStore === 'object' && workStore === null) return null;
  if (notNullStore === null) return null;

  const [workState] = notNullStore;
  const { objectList, classList, tagList } = workState;

  return (
    <RightPanel areaPercent={areaPercent}>
      <ToggleList<BoxObject>
        title={'Bounding Box'}
        contentList={objectList}
        contentExtractor={objectExtractor}
        expandRatio={80}
        upperFixed
      />
      <ToggleList<string>
        title={'Class'}
        contentList={classList}
        contentExtractor={classExtractor}
        expandRatio={20}
      />
      <ToggleList<string>
        title={'Tag'}
        contentList={tagList}
        contentExtractor={tagExtractor}
      />
    </RightPanel>
  );
}

// Warning: 함수 선언문만 Hoisting 되므로 arrow function으로 변경불가
function objectExtractor(boxObject: BoxObject, index: number): string {
  const { ObjectId, ClassName } = boxObject;
  const content = `[${ObjectId}]: ${ClassName}`;
  return content;
}

function classExtractor(className: string, index: number): string {
  const content = `[${index}]: ${className}`;
  return content;
}

function tagExtractor(tagName: string, index: number): string {
  const content = `[${index}]: ${tagName}`;
  return content;
}

export default RightControlPanel;
