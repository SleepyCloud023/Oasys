/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { Button } from '@components';
import { useNavigate } from 'react-router-dom';
import { css, styled, Theme, useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuth from '@hooks/useAuth';
import UserDetail from './UserDetail';
import { Login } from '@mui/icons-material';
import LoginModal from '@pages/Login/LoginModal';

const StyledSection = styled((props: BoxProps) => (
  <Box component="section" {...props} />
))`
  flex: 20 1 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const StyleButtonIcon = styled(IconButton)`
  padding: ${0.1}rem;
`;

const styleIcon = (theme: Theme) => css`
  width: 2rem;
  height: 2rem;
  color: ${theme.palette.primary.main};
`;

// type UserInfoProps = {};

function UserInfo() {
  const [user, login, logout, oAuthSetUser] = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const detailOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const UserAvatar = (
    <StyleButtonIcon onClick={handleClick}>
      <AccountCircleIcon css={styleIcon(theme)} />
    </StyleButtonIcon>
  );

  const LoginButton = (
    <Button
      startIcon={<Login />}
      onClick={() => setModalOpen(true)}
      aria-controls={detailOpen ? 'account-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={detailOpen ? 'true' : undefined}
    >
      Login
    </Button>
  );

  return (
    <StyledSection>
      {user.login ? UserAvatar : LoginButton}
      <UserDetail
        open={detailOpen}
        anchorEl={anchorEl}
        onClick={handleClose}
        onClose={handleClose}
        logout={logout}
      />
      <LoginModal
        open={modalOpen}
        setOpen={setModalOpen}
        login={login}
        oAuthSetUser={oAuthSetUser}
        onClose={() => setModalOpen(false)}
      />
    </StyledSection>
  );
}

export default UserInfo;
