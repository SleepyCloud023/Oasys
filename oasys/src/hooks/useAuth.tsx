/** @jsxImportSource @emotion/react */
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type User = {
  readonly login: boolean;
  readonly id?: string;
  readonly username?: string;
};

const loginCheckURL = `/api/login`;
const logoutURL = `/api/login`;
const defaultUser: User = { login: false };

// type UserInfoProps = {};

function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User>(defaultUser);

  function loginCheck() {
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      const userObject: User = JSON.parse(storedUser);
      setUser(userObject);
    }
  }

  async function login() {
    const { data: currentUser } = await axios.get(loginCheckURL);
    setUser(currentUser);
    sessionStorage.setItem('user', currentUser);
    navigate(-1);
  }

  async function logout() {
    const response = await axios.delete(logoutURL);

    if (!response.data.logout) {
      throw Error('logout is failed!');
    }

    sessionStorage.removeItem('user');
    navigate(-1);
  }

  React.useEffect(() => {
    loginCheck();
  }, []);

  return [user, login, logout];
}

export default useAuth;
