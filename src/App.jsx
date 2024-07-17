import React from 'react';
import './css/App.css';
import BottomNav from './components/BottomNav.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Archive from './pages/Archive.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <div className='container'>
          <Header />
          <div className="container-view">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Archive/>} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

