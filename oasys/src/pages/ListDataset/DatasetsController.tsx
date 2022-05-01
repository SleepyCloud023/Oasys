/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button, css, Divider, styled } from '@mui/material';
import { Workspace } from './types/list-dataset';
import DatasetCreater from './DatasetCreater';

type DatasetsControllerProps = {
  workspaceId: number;
  workspace: Workspace;
  setWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
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

function DatasetsController({
  workspaceId,
  workspace,
  setWorkspace,
}: DatasetsControllerProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <h2>ImageSetController</h2>
      <Button variant="contained" css={buttonStyle} onClick={handleOpen}>
        Create Dataset
      </Button>
      <Divider css={dividerStyle} />
      <DatasetCreater
        workspaceId={workspaceId}
        open={open}
        handleClose={handleClose}
        setWorkspace={setWorkspace}
      />
    </>
  );
}

export default DatasetsController;
