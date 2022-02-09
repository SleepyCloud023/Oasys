import React, { useContext } from 'react';
import styled from 'styled-components';
import ToggleList from './ToggleList';
import { WorkDispatch } from './WorkingSection';

const RightPanel = styled.div`
  border: 1px solid transparent;
  border-radius: 3px;
  border: 2px solid azure;
  color: white;
  font: bold;
  /* 배치 */
  ${({ areaPercent }) => {
    if (!areaPercent) {
      console.log('RightPanel: areaPercent is needed');
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

function objectExtractor(element, index) {
  const { ObjectId, ClassName, Bbox } = element;
  //console.log(`${index}: ${Bbox}`);
  const content = `[${ObjectId}]: ${ClassName}`;
  return content;
}

function classExtractor(className, index) {
  const content = `[${index}]: ${className}`;
  return content;
}

function tagExtractor(tagName, index) {
  const content = `[${index}]: ${tagName}`;
  return content;
}

function RightControlPanel({ areaPercent, workState, ...rest }) {
  const workDispatch = useContext(WorkDispatch);
  console.log(workState);
  const { objectList, classList, tagList } = workState;

  return (
    <RightPanel areaPercent={areaPercent} {...rest}>
      <ToggleList
        title={'Bounding Box'}
        contentList={objectList}
        contentExtractor={objectExtractor}
        expandRatio={80}
        upperFixed
      />
      <ToggleList
        title={'Class'}
        contentList={classList}
        contentExtractor={classExtractor}
        expandRatio={20}
      />
      <ToggleList
        title={'Tag'}
        contentList={tagList}
        contentExtractor={tagExtractor}
      />
    </RightPanel>
  );
}

export default RightControlPanel;
