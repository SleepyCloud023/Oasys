/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button, css, Divider, styled } from '@mui/material';
import { Permission } from './types/list-workspace';
import DatasetCreater from './WorkspaceCreater';

type DatasetsControllerProps = {
  userId: string;
  permission: Permission;
  setPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
};

const buttonStyle = css`
  margin-left: 6px;
  background: teal;
  color: white;
`;

const dividerStyle = css`
  align-self: stretch;
  margin: 0.5rem 10px;
`;

function WorkspacesController({
  userId,
  permission,
  setPermission,
}: DatasetsControllerProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <h1>Home - Workspace List</h1>
      <Button variant="contained" css={buttonStyle} onClick={handleOpen}>
        Create Workspace
      </Button>
      <Divider css={dividerStyle} />
      <DatasetCreater
        userId={userId}
        open={open}
        handleClose={handleClose}
        setPermission={setPermission}
      />
    </>
  );
}

export default WorkspacesController;
