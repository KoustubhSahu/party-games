// src/App.js

import React from 'react';
// 1. Change the import from BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import MafiaGame from './games/mafia/MafiaGame';
import RoleRevealPage from './games/mafia/RoleRevealPage';

function App() {
  return (
    // 2. Change the component to Router (which is now HashRouter) and REMOVE the basename prop
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mafia" element={<MafiaGame />} />
          <Route path="/role-reveal" element={<RoleRevealPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;