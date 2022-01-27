import React from 'react';
import styled from 'styled-components';
import MockData from '../../MockData/MainView.json';
import ToggleList from './ToggleList';

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
  const { ClassName, Bbox } = element.Object;
  console.log(`${index}: ${Bbox}`);
  const content = `[${index}]: ${ClassName}`;
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

function RightControlPanel({ areaPercent, ...rest }) {
  const { ObjectList, ClassList, TagList } = MockData;
  const multiList = [...ObjectList, ...ObjectList, ...ObjectList];
  console.log(`multiList: ${multiList}`);
  return (
    <RightPanel areaPercent={areaPercent} {...rest}>
      <ToggleList
        title={'Bounding Box'}
        contentList={ObjectList}
        contentExtractor={objectExtractor}
        expandRatio={80}
        upperFixed
      />
      <ToggleList
        title={'Class'}
        contentList={ClassList}
        contentExtractor={classExtractor}
        expandRatio={20}
      />
      <ToggleList
        title={'Tag'}
        contentList={TagList}
        contentExtractor={tagExtractor}
      />
    </RightPanel>
  );
}

export default RightControlPanel;
