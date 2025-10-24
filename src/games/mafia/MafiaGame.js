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
  const [gameState, setGameState] = useState('SETUP');
  const [players, setPlayers] = useState(initialPlayers);
  const [winner, setWinner] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [gamePhase, setGamePhase] = useState('');

  // ... (useEffect hooks for win conditions and background remain the same) ...
  useEffect(() => {
    if (gameState === 'GAME_CYCLE') {
      const gameWinner = checkWinConditions(players);
      if (gameWinner) {
        setWinner(gameWinner);
        setGameState('GAME_OVER');
      }
    }
  }, [players, gameState]);

  useEffect(() => {
    const originalColor = document.body.style.backgroundColor;
    if (gameState === 'GAME_CYCLE') {
      if (gamePhase.startsWith('NIGHT')) {
        document.body.classList.add('night-bg');
        document.body.classList.remove('day-bg');
      } else {
        document.body.classList.add('day-bg');
        document.body.classList.remove('night-bg');
      }
    } else {
        document.body.classList.add('day-bg');
        document.body.classList.remove('night-bg');
    }
    return () => {
      document.body.style.backgroundColor = originalColor;
      document.body.classList.remove('night-bg', 'day-bg');
    };
  }, [gameState, gamePhase]);


  const handleAssignRoles = () => {
    // IMPROVEMENT: Trim names and assign default names to blank fields
    const processedPlayers = players.map((p, index) => {
      const trimmedName = p.name.trim();
      return {
        ...p,
        // If the trimmed name is empty, assign 'Gumnam #', otherwise use the trimmed name
        name: trimmedName === '' ? `Gumnam ${index + 1}` : trimmedName,
      };
    });

    // We update the state here so the user sees the new "Gumnam" names in the UI
    setPlayers(processedPlayers);

    // Now, we perform the duplicate check on the processed names
    const playerNames = processedPlayers.map(p => p.name.toLowerCase());
    const hasDuplicates = new Set(playerNames).size !== playerNames.length;
    if (hasDuplicates) {
      alert('Player names must be unique. Please remove duplicate names.');
      return;
    }

    // If all checks pass, assign roles and proceed
    const playersWithRoles = assignRoles(processedPlayers);
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
        return (
          <GameCycle
            players={players}
            setPlayers={setPlayers}
            onGameEnd={handleGameEnd}
            onPhaseChange={setGamePhase}
          />
        );
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