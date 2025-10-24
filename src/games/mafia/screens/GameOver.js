import React from 'react';

const GameOver = ({ winner, onPlayAgain }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Game Over!</h2>
      <h3 style={{ color: winner === 'MAFIA_WINS' ? '#e74c3c' : '#2ecc71' }}>
        {winner === 'MAFIA_WINS' ? 'The Mafia Wins!' : 'The Villagers Win!'}
      </h3>
      <button className="btn btn-primary" onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default GameOver;