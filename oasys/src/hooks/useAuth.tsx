/** @jsxImportSource @emotion/react */
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export type UserLogin = {
  readonly username: string;
  readonly password: string;
};

export type User = {
  readonly login: boolean;
  readonly id?: string;
  readonly username?: string;
};

const authURL = `/api/login/user`;
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

  async function logIn(userLogin: UserLogin) {
    const { data: currentUser } = await axios.post(authURL, userLogin);

    setUser(currentUser);
    sessionStorage.setItem('user', JSON.stringify(currentUser));

    return currentUser.login;
    // navigate(-1);
  }

  async function logOut() {
    const { data } = await axios.delete(authURL);

    if (!data.logout) {
      throw Error('logout is failed!');
    }

    setUser(defaultUser);
    sessionStorage.removeItem('user');
    // navigate(-1);

    // TODO: 아래 코드 실행 시 업데이트 전 user가 나온다.
    // setState는 비동기적으로 배치 단위로 실행될 수 있기때문이다.
    // 여기서 최신화된 user에 대해 log하기 위해 lazy evaluation을 사용하려면
    // 어떻게 해야할까?
    // console.log(user);
    // setTimeout(() => console.log(user), 500);
  }

  function oAuthSetUser(currentUser: User) {
    setUser(currentUser);
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }

  React.useEffect(() => {
    loginCheck();
  }, []);

  return [user, logIn, logOut, oAuthSetUser] as const;
}

export default useAuth;
