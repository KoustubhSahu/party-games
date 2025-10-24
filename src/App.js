import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import MafiaGame from './games/mafia/MafiaGame';
import RoleRevealPage from './games/mafia/RoleRevealPage';

function App() {
  return (
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