import React from 'react';
import style from './styles/App.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';

const App: React.FC = () => {
  return (
    <div className={style['body']}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;