/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Button } from '@components';
import { To, useNavigate } from 'react-router-dom';
import { css, styled } from '@mui/material/styles';
import { Box, BoxProps, ButtonGroup } from '@mui/material';

const StyledSection = styled((props: BoxProps) => (
  <Box component="section" {...props} />
))`
  flex: 30 1 0;
`;

const styleButton = css`
  font-weight: 400;
`;

type TabItem = [route: To, title: string, fullHeight: boolean];

// type ExplorerProps = {};
function Explorer() {
  const navigate = useNavigate();
  const tabList: Array<TabItem> = [
    ['/home', 'Home', true],
    //['/dataset', 'Dataset', true],
    //['/home', 'Image', true],
    //['/dataset', 'Upload', true],
  ];

  return (
    <StyledSection>
      <ButtonGroup variant="text">
        {tabList.map((tabItem, index) => {
          const [route, title, fullHeight] = tabItem;
          return (
            <Button
              css={styleButton}
              key={title}
              fullHeight={fullHeight}
              onClick={() => navigate(route)}
            >
              {title}
            </Button>
          );
        })}
      </ButtonGroup>
    </StyledSection>
  );
}

export default Explorer;
