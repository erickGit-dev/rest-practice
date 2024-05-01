import React from 'react';
import Navbar from './components/navbar.main';
import sApp from './styles/app.module.css'
import { Route, Routes } from 'react-router-dom';
import Products from './components/routes/products';
import Store from './components/routes/store';

function App() {
  return (
    <div className={sApp.main}>
      <Navbar/>
      <Routes>
        <Route path='/'></Route>
        <Route path='/Products' element={<Products/>}></Route>
        <Route path='/Store' element={<Store/>}></Route>
      </Routes>
    </div>
  );
}

export default App;