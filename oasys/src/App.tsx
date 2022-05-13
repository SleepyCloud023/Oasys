import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { appTheme } from './appTheme';
import {
  Annotation,
  Home,
  ListDataset,
  ListImage,
  Login,
  Navigation,
  ErrorPage,
} from './pages';
import { styled } from '@mui/material/styles';

const StyledApp = styled(Box)`
  display: flex;
  flex-flow: column;
  width: 100vw;
  color: black;
`;

function App() {
  const [loginState, setLoginState] = useState<{
    login: boolean | null;
    id: string;
  }>({
    login: null,
    id: '',
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <StyledApp>
        <Routes>
          <Route
            path="/"
            element={<Navigation setLoginState={setLoginState} />}
          >
            <Route
              path="home"
              element={
                loginState.login ? (
                  <Home id={loginState.id} />
                ) : (
                  <ErrorPage login={loginState.login} />
                )
              }
            />
            <Route
              path="dataset/:id"
              element={
                loginState.login ? (
                  <ListDataset />
                ) : (
                  <ErrorPage login={loginState.login} />
                )
              }
            />
            <Route
              path="imageSet/:id"
              element={
                loginState.login ? (
                  <ListImage />
                ) : (
                  <ErrorPage login={loginState.login} />
                )
              }
            />
          </Route>
          <Route path="/annotation/:id" element={<Annotation />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
