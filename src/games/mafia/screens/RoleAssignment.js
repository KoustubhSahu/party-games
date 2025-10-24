import React, { useState } from 'react';
import RoleCard from '../components/RoleCard';

const RoleAssignment = ({ players, onBeginGame }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const goToNextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const goToPrevPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex - 1 + players.length) % players.length);
  };

  return (
    <div className="role-assignment-screen">
      <p>Pass the device to each player to reveal their role.</p>
      <div className="role-carousel">
        <button className="carousel-arrow" onClick={goToPrevPlayer}>&lt;</button>
        <RoleCard player={players[currentPlayerIndex]} playerNumber={currentPlayerIndex+1} />
        <button className="carousel-arrow" onClick={goToNextPlayer}>&gt;</button>
      </div>
      <div style={{ marginTop: '30px' }}>
        <button className="btn btn-primary" onClick={onBeginGame}>Begin Game Cycle</button>
      </div>
    </div>
  );
};

export default RoleAssignment;