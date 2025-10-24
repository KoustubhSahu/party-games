import React from 'react';
import GameTiles from './GameTiles';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Party Games</h1>
        <p>Choose a game to play</p>
      </header>
      <main>
        <GameTiles />
      </main>
    </div>
  );
};

export default HomePage;