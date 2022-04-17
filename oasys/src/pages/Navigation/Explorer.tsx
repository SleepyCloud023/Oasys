/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Button } from '@components';
import { To, useNavigate } from 'react-router-dom';
import { css, styled } from '@mui/material/styles';
import { Box, ButtonGroup } from '@mui/material';

const StyledExplorer = styled(Box)``;

type TabItem = [route: To, title: string, fullHeight: boolean];

// type ExplorerProps = {};
function Explorer() {
  const navigate = useNavigate();
  const tabList: Array<TabItem> = [
    ['/home', 'Home', true],
    ['/dataset', 'Dataset', true],
  ];

  return (
    <ButtonGroup variant="text">
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
    </ButtonGroup>
  );
}

export default Explorer;
