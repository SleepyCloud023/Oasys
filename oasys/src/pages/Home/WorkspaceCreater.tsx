import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Permission } from './types/list-workspace';

type DatasetCreaterProps = {
  userId: string;
  open: boolean;
  handleClose: () => void;
  setPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
};

const workspaceUrl = '/api/workspace';
const permissionUrl = '/api/permission';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

const buttonStyle = {
  margin: '10px',
  alignSelf: 'center',
};

const MsgBox = styled(Box)`
  color: red;
`;

function WorkspaceCreater({
  userId,
  open,
  handleClose,
  setPermission,
}: DatasetCreaterProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setLoading(true);
    event.preventDefault();
    //await new Promise((r) => setTimeout(r, 1000));

    const data = { name: name, user: userId };
    const { data: res } = await axios.post(`${workspaceUrl}/0`, data);
    setLoading(false);

    if (res.success) {
      const { data: resData } = await axios.get(`${permissionUrl}/${userId}`);
      setPermission(resData);
      handleClose();
    } else {
      setMsg(res.error_msg);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" noValidate autoComplete="off">
        <TextField
          required
          id="outlined-required"
          label="Workspace Name"
          variant="outlined"
          value={name}
          onChange={handleChange}
          size="small"
        />
        <MsgBox>{msg}</MsgBox>
        <LoadingButton
          loading={loading}
          variant="contained"
          sx={buttonStyle}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </Modal>
  );
}

export default WorkspaceCreater;
