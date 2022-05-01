import { useEffect, useState } from 'react';
import { Box, Button, css } from '@mui/material';
import styled from '@mui/system/styled';
import axios from 'axios';
import Datasets from './Datasets';
import { Workspace } from './types/list-dataset';
import DatasetsController from './DatasetsController';

const id = 2;

const StyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    color: black;
    flex: 1 0 0;
  `,
);

type Permission = {
  userName: string;
  dataset: Array<{ id: number; name: string }>;
};

function ListDataset() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  // const imageSetURL = useLocation().pathname;

  useEffect(() => {
    (async function () {
      const response = await axios.get(`/api/workspace/${id}`);
      setWorkspace(response.data);
    })();
  }, []);

  if (typeof id === 'undefined' || workspace === null) {
    // TODO: 에러시 보여줄 페이지 작성
    return null;
  }

  return (
    <StyledBox>
      <DatasetsController
        workspaceId={id}
        workspace={workspace}
        setWorkspace={setWorkspace}
      />
      <Datasets workspaceId={id} workspace={workspace} />
    </StyledBox>
  );
}

export default ListDataset;
