import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ToggleList from './ToggleList';
import { BoxObject } from '../types';
import { WorkStore } from '../WorkingSection';
import { Chip, Divider, ListItem, ListItemText } from '@mui/material';

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
        contentExtractor={ObjectExtractor}
        upperFixed
      />
      <ToggleList<string>
        title={'Class'}
        contentList={classList}
        contentExtractor={ClassExtractor}
      />
      <ToggleList<string>
        title={'Tag'}
        contentList={tagList}
        contentExtractor={TagExtractor}
      />
    </RightPanel>
  );
}

// Warning: 함수 선언문만 Hoisting 되므로 arrow function으로 변경불가
function ObjectExtractor(boxObject: BoxObject, index: number) {
  // const [hover, setHover] = useState(false);
  const { ObjectId, ClassName, Bbox, Extra } = boxObject;
  const text_primary = (
    <>
      {'Class: '}
      {ClassName.length > 0 ? ClassName : 'Empty'}
    </>
  );
  // const text_extra = true && Extra.map((extraObject) => extraObject.text);

  const new_content = (
    <>
      <Divider light />
      <ListItem
        sx={{ px: '4px' }}
        // onMouseOver={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
        //   setHover(!hover)
        // }
      >
        <Chip label={ObjectId} size={'small'} />
        <ListItemText
          sx={{ mx: '6px' }}
          primary={text_primary}
          // secondary={text_extra}
        />
      </ListItem>
    </>
  );
  return new_content;
}

function ClassExtractor(className: string, index: number) {
  const content = `[${index}]: ${className}`;
  return content;
}

function TagExtractor(tagName: string, index: number) {
  const content = `[${index}]: ${tagName}`;
  return content;
}

export default RightControlPanel;
