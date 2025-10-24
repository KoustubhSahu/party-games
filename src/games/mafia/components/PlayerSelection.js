import React from 'react';

// IMPROVEMENT: Added selectionStyle prop to handle different visual feedback
const PlayerSelection = ({ players, onSelect, selected, mafiaTarget, selectionStyle }) => {

  const getClassName = (player) => {
    let classes = 'player-card';
    if (selected === player.id) {
        if (selectionStyle === 'mafia') {
            classes += ' mafia-selected';
        } else if (selectionStyle === 'doctor') {
            classes += ' doctor-selected';
        } else {
            classes += ' selected'; // Fallback
        }
    }
    if (mafiaTarget === player.id) {
        classes += ' mafia-target';
    }
    return classes;
  };

  return (
    <div className="player-selection-grid">
      {players.map(player => (
        <div
          key={player.id}
          className={getClassName(player)}
          onClick={() => onSelect(player.id)}
        >
          {player.name}
        </div>
      ))}
    </div>
  );
};

export default PlayerSelection;