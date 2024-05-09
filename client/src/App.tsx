import React from 'react';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;