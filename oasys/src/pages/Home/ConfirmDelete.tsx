import * as React from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { deleteDatasetById } from '@api/dataset';
import { deleteWorkspaceById } from '@api/workspace';
import { Permission, Workspace } from './types/list-workspace';

export type ConfirmDeleteProps = {
  open: boolean;
  userId: string;
  workspaceInfo: Workspace;
  setPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
  handleClose: () => void;
};

function ConfirmDelete({
  open,
  userId,
  workspaceInfo,
  setPermission,
  handleClose,
}: ConfirmDeleteProps) {
  async function deleteWorkspace(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    const response = await deleteWorkspaceById(workspaceInfo.id);

    if (response.success) {
      const get_data_res = await axios.get(`/api/permission/${userId}`);
      setPermission(get_data_res.data);
    }
    // TODO: 실패 시 Alert 추가
    else {
    }

    handleClose();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete Dataset : "${workspaceInfo.name}"`}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Disagree
          </Button>
          <Button variant="contained" onClick={deleteWorkspace} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDelete;
