import React from 'react';
import style from './styles/App.module.css'
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className={style['body']}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;