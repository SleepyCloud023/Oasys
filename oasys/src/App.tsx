import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import { Annotation, Home, ListDataset } from './Pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="home" element={<Home />} />
        <Route path="dataset" element={<ListDataset />} />
      </Route>
      <Route path="/annotation" element={<Annotation />} />
    </Routes>
  );
}

export default App;
