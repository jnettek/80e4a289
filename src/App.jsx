import React from 'react';
import "./css/App.css";
import BottomNav from './components/BottomNav.jsx';
import Header from './components/Header.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';

const App = () => {
  return (
    <div className='app'>
      <div className='container'>
        <Header/>
        <div className="container-view">
        <ActivityFeed/>
        </div>
        <BottomNav/>
      </div>
    </div>
  );
};

export default App;
