/** @jsxImportSource @emotion/react */
import * as React from 'react';
import axios from 'axios';
import { User } from './useAuth';

// TODO: 리액트 훅보다는 일반적인 util에 가까움

type Profile = {
  email: string;
  first_name: string;
  last_name: string;
};

type Token = any;

// type useOauthProps = {};

function useOauth() {
  async function validateTokenAndObtainSession(
    profile: Profile,
    tokenId: Token,
  ) {
    const headers = {
      Authorization: tokenId,
      'Content-Type': 'application/json',
    };

    const loginURL = `/api/login/oauth`;
    const response = await axios.post(loginURL, profile, { headers: headers });
    const { data: user } = response;

    return user;
  }

  const getGoogleUser = async (Response: any) => {
    console.log(Response);

    const { tokenId } = Response;
    const { email, givenName, familyName, imageUrl } = Response.profileObj;
    const profile: Profile = {
      email,
      first_name: givenName,
      last_name: familyName,
    };
    const user: User = await validateTokenAndObtainSession(profile, tokenId);

    return { ...user, imageUrl, email };
  };

  return [getGoogleUser] as const;
}

export default useOauth;
