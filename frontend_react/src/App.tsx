import React from 'react';
import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/NotFound';
import NotFound from './pages/Register';
import { RequireAuth } from './RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        } /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/register' element={<Register/>} /> 
        <Route path='*' element={<NotFound/>} /> 
      </Routes>
    </div>
  );
}

export default App;
