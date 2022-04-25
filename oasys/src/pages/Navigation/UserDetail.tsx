/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Box, styled } from '@mui/material';
import { User } from '@hooks/useAuth';

const StyledProfile = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 1rem;
  /* text-align: center; */
`;

type UserDetailProps = {
  user: User;
  handleLogout: () => void;
} & MenuProps;

function UserDetail({ user, handleLogout, ...props }: UserDetailProps) {
  return (
    <Menu
      id="account-menu"
      PaperProps={{
        elevation: 1,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      {...props}
    >
      <StyledProfile component={'section'}>
        {/* <h1>My account</h1> */}
        <Avatar
          src={user.imageUrl}
          sx={{ width: '5rem', height: '5rem' }}
          alt="profile-image"
        />
        <span>{user.username}</span>
        <span>{user.email}</span>
      </StyledProfile>
      <Divider />
      {/* <MenuItem>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem> */}
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}
export default UserDetail;
