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
  const [loginState, setLoginState] = useState<{ login: boolean; id: string }>({
    login: false,
    id: '',
  });

  console.log(loginState);

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
                loginState.login ? <Home id={loginState.id} /> : <ErrorPage />
              }
            />
            <Route
              path="dataset/:id"
              element={loginState.login ? <ListDataset /> : <ErrorPage />}
            />
            <Route
              path="imageSet/:id"
              element={loginState.login ? <ListImage /> : <ErrorPage />}
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
