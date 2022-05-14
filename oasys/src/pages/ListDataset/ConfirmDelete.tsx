import * as React from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { Dataset, Workspace } from './types/list-dataset';
import { deleteDatasetById } from '@api/dataset';

export type ConfirmDeleteProps = {
  open: boolean;
  workspaceId: number;
  datasetInfo: Dataset;
  setWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
  handleClose: () => void;
};

function ConfirmDelete({
  open,
  workspaceId,
  datasetInfo,
  setWorkspace,
  handleClose,
}: ConfirmDeleteProps) {
  async function deleteDataset(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    const response = await deleteDatasetById(datasetInfo.id);

    if (response.success) {
      const get_data_res = await axios.get(`/api/workspace/${workspaceId}`);
      setWorkspace(get_data_res.data);
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
          {`Delete Dataset : "${datasetInfo.name}"`}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Disagree
          </Button>
          <Button variant="contained" onClick={deleteDataset} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDelete;
