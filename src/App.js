import React from 'react';
// Make sure BrowserRouter is imported as Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import MafiaGame from './games/mafia/MafiaGame';
import RoleRevealPage from './games/mafia/RoleRevealPage';

function App() {
  return (
    // IMPROVEMENT: Add the basename prop here
    <Router basename="/party-games">
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