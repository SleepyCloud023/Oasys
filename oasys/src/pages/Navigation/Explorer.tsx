/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Button } from '@components';
import { To, useNavigate } from 'react-router-dom';

type TabItem = [route: To, title: string, fullHeight: boolean];

// type ExplorerProps = {};
function Explorer() {
  const tabList: Array<TabItem> = [
    ['/home', 'Home', true],
    ['/dataset', 'Dataset', true],
  ];
  const navigate = useNavigate();

  return (
    <>
      {tabList.map((tabItem, index) => {
        const [route, title, fullHeight] = tabItem;
        return (
          <Button
            key={title}
            fullHeight={fullHeight}
            onClick={() => navigate(route)}
          >
            {title}
          </Button>
        );
      })}
    </>
  );
}

export default Explorer;
