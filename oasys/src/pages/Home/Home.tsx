import { useEffect, useState } from 'react';
import { Box, Button, css } from '@mui/material';
import styled from '@mui/system/styled';
import axios from 'axios';
import Workspaces from './Workspaces';
import { Permission } from './types/list-workspace';
import WorkspacesController from './WorkspacesController';
import { idText } from 'typescript';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    color: black;
    flex: 1 0 0;
  `,
);

function Home({ id }: { id: string }) {
  const [permission, setPermission] = useState<Permission | null>(null);
  // const imageSetURL = useLocation().pathname;

  useEffect(() => {
    (async function () {
      const response = await axios.get(`/api/permission/${id}`);
      setPermission(response.data);
    })();
  }, [id]);

  if (typeof id === 'undefined' || permission === null) {
    // TODO: 에러시 보여줄 페이지 작성
    return null;
  }

  return (
    <StyledBox>
      <WorkspacesController
        userId={id}
        permission={permission}
        setPermission={setPermission}
      />
      <Workspaces userId={id} permission={permission} />
    </StyledBox>
  );
}

export default Home;
