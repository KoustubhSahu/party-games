import React, { useState, useEffect } from 'react';
import './MafiaGame.css';
import { assignRoles, checkWinConditions } from './utils/gameLogic';

import MafiaHomepage from './screens/MafiaHomepage';
import RoleAssignment from './screens/RoleAssignment';
import GameCycle from './screens/GameCycle';
import GameOver from './screens/GameOver';
import ConfirmationModal from './components/ConfirmationModal';

const initialPlayers = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: '',
  role: null,
  isAlive: true,
  votes: 0
}));

const MafiaGame = () => {
  const [gameState, setGameState] = useState('SETUP'); // SETUP, ROLE_ASSIGNMENT, GAME_CYCLE, GAME_OVER
  const [players, setPlayers] = useState(initialPlayers);
  const [winner, setWinner] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    // This effect runs after each state update to check for a winner
    if (gameState === 'GAME_CYCLE') {
      const gameWinner = checkWinConditions(players);
      if (gameWinner) {
        setWinner(gameWinner);
        setGameState('GAME_OVER');
      }
    }
  }, [players, gameState]);


  const handleAssignRoles = () => {
    if (players.some(p => p.name.trim() === '')) {
      alert('Please enter a name for every player.');
      return;
    }
    const playersWithRoles = assignRoles(players);
    setPlayers(playersWithRoles);
    setGameState('ROLE_ASSIGNMENT');
  };

  const handleBeginGame = () => {
    setGameState('GAME_CYCLE');
  };

  const handleGameEnd = () => {
    const gameWinner = checkWinConditions(players);
     if (gameWinner) {
        setWinner(gameWinner);
        setGameState('GAME_OVER');
      }
      return gameWinner;
  };
  
  const resetForNewGame = () => {
    // Keep player names and count, but reset game-specific state
    setPlayers(players.map(p => ({ ...p, role: null, isAlive: true, votes: 0 })));
    setWinner(null);
    setGameState('SETUP');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'SETUP':
        return <MafiaHomepage players={players} setPlayers={setPlayers} onAssignRoles={handleAssignRoles} />;
      case 'ROLE_ASSIGNMENT':
        return <RoleAssignment players={players} onBeginGame={handleBeginGame} />;
      case 'GAME_CYCLE':
        return <GameCycle players={players} setPlayers={setPlayers} onGameEnd={handleGameEnd} />;
      case 'GAME_OVER':
        return <GameOver winner={winner} onPlayAgain={resetForNewGame} />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="mafia-container">
      <div className="mafia-header">
        <h1>Mafia</h1>
         {gameState !== 'SETUP' && (
            <button className="btn btn-danger" style={{float: 'right'}} onClick={() => setShowExitModal(true)}>Exit Game</button>
         )}
      </div>
     
      {renderGameState()}

      {showExitModal && (
        <ConfirmationModal 
            message="Are you sure you want to exit? The current game will end."
            onConfirm={() => {
                setShowExitModal(false);
                resetForNewGame();
            }}
            onCancel={() => setShowExitModal(false)}
        />
      )}
    </div>
  );
};

export default MafiaGame;