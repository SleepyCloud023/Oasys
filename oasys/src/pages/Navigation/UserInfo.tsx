/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// type UserInfoProps = {};

function UserInfo() {
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState('');

  async function loginCheck() {
    const loginCheckURL = `/api/login`;
    const response = await axios.get(loginCheckURL);

    if (response.data.login) {
      setUserId(response.data.username);
    } else {
      navigate('/login');
    }
  }
  async function logOut() {
    const logoutURL = `/api/login`;
    const response = await axios.delete(logoutURL);
    if (response.data.logout) {
      navigate('/login');
    }
  }

  React.useEffect(() => {
    loginCheck();
  }, []);

  const UserNameBox = () => (
    <Box sx={{ display: 'inline', marginLeft: 'auto' }}>
      {'User : ' + userId}
    </Box>
  );

  const LogOutButton = () => (
    <Button onClick={logOut} fullHeight sx={{ marginLeft: '0.5rem' }}>
      LogOut
    </Button>
  );

  return (
    <>
      <UserNameBox />
      <LogOutButton />
    </>
  );
}

export default UserInfo;
